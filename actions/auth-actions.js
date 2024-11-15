'use server';

import { redirect } from 'next/navigation';

import bcrypt from 'bcrypt';

import dbConnect from '@/lib/dbConnect';
import User from '@/lib/models/User';

import { createSession, deleteSession } from '@/lib/session';

dbConnect();

export const login = async (prevState, formData) => {
  const email = formData.get('email');
  const password = formData.get('password');

  // Validation
  let errors = {
    email: '',
    password: '',
  };

  // Empty field validation
  if (!email) {
    errors.email = 'Email is required';
  }
  if (!password) {
    errors.password = 'Password is required';
  }
  if (Object.values(errors).some((error) => error !== '')) {
    return { errors, fieldData: { email } };
  }

  // User validation
  const user = await User.findOne({ email });
  if (!user) {
    errors.email = 'User not found';
    return { errors, fieldData: { email } };
  }

  // Password validation
  const isPasswordValid = await bcrypt.compare(password, user.password);
  if (!isPasswordValid) {
    errors.password = 'Password is incorrect';
    return { errors, fieldData: { email } };
  }

  await createSession(user._id.toString());

  redirect('./user');
};

export const logout = async () => {
  await deleteSession();
  redirect('/');
};
