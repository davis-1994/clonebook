import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';

import { decrypt, getUser } from '@/lib/session';

const protectedRoutes = ['/user'];
const publicRoutes = ['/'];

export const middleware = async (req) => {
  const path = req.nextUrl.pathname;
  const isProtectedRoute = protectedRoutes.includes(path);
  const isPublicRoute = publicRoutes.includes(path);

  const cookie = (await cookies()).get('session')?.value;

  const session = await decrypt(cookie);

  if (isProtectedRoute && !session?.userId) {
    return NextResponse.redirect(new URL('/', req.nextUrl));
  }

  if (isPublicRoute && session?.userId) {
    const user = await getUser();

    if (!user) {
      return NextResponse.redirect(new URL('/', req.nextUrl));
    } else {
      return NextResponse.redirect(new URL('/user', req.nextUrl));
    }
  }

  return NextResponse.next();
};
