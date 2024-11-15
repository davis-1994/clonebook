'use client';

import { useActionState } from 'react';

import { login } from '@/actions/auth-actions';
import Link from 'next/link';

const LoginForm = () => {
  const [state, formAction, isPending] = useActionState(login, {});

  return (
    <form
      className='flex justify-center items-center flex-col md:gap-4 gap-2 rounded-md md:min-w-[400px] bg-base-200 md:p-10 p-4 shadow-md border border-neutral-300'
      action={formAction}
    >
      <input
        type='email'
        placeholder='Email'
        className={`input input-bordered w-full max-w-xs ${
          state?.errors?.email && 'input-error'
        }`}
        defaultValue={state?.fieldData?.email}
        name='email'
      />
      <input
        type='password'
        placeholder='Password'
        className={`input input-bordered w-full max-w-xs 
            ${state?.errors?.password && 'input-error'}`}
        name='password'
      />
      <button
        className='btn btn-primary w-full text-white'
        disabled={isPending}
      >
        Log In
      </button>
      <div className='divider m-0' />
      <Link href='/auth'>
        <button className='btn btn-secondary w-full text-white'>
          Create new account
        </button>
      </Link>
    </form>
  );
};

export default LoginForm;
