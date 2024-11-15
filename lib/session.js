import 'server-only';

import { jwtVerify, SignJWT } from 'jose';
import { cookies } from 'next/headers';

import dbConnect from '@/lib/dbConnect';
import User from '@/lib/models/User';

const secretKey = process.env.SESSION_SECRET;
const encodedKey = new TextEncoder().encode(secretKey);

export const createSession = async (userId) => {
  const expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000); // 7 days
  const session = await encrypt({ userId, expiresAt });

  const cookieStore = await cookies();
  cookieStore.set('session', session, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    expires: expiresAt,
  });
};

export const encrypt = async (payload) => {
  return new SignJWT(payload)
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setExpirationTime('7d')
    .sign(encodedKey);
};

export const deleteSession = async () => {
  // await cookies().delete('session');
  const cookieStore = await cookies();
  cookieStore.delete('session');
};

export const decrypt = async (session) => {
  try {
    const { payload } = await jwtVerify(session, encodedKey, {
      algorithms: ['HS256'],
    });

    return payload;
  } catch (error) {
    console.log('Failed to verify session');
  }
};

export const getUser = async () => {
  await dbConnect();

  const session = (await cookies()).get('session')?.value;

  if (session) {
    const { userId } = await decrypt(session);

    return User.findById(userId).select('-password');
  }

  return null;
};
