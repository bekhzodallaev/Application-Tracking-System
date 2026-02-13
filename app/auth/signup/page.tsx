'use client';

import React, { useActionState } from 'react';
import { MdEmail } from 'react-icons/md';
import { RiLockPasswordFill } from 'react-icons/ri';
import { FcGoogle } from 'react-icons/fc';
import Link from 'next/link';
import { FaUser } from 'react-icons/fa';
import { signup } from '@/app/lib/actions/auth';
import { Loader } from '@/app/components/Loader';

const SignUp = () => {
  const [state, action, pending] = useActionState(signup, undefined);

  return (
    <>
      {pending && <Loader text="Creating an account..." />}

      <div className="min-h-screen w-full flex items-center justify-center bg-gray-50 px-4 py-12 sm:px-6 lg:px-8">
        <div className="w-full max-w-md sm:max-w-lg md:max-w-xl space-y-8">
          <div className="text-center">
            <h1 className="text-3xl sm:text-4xl font-bold text-gray-900">AppTrackr</h1>
            <p className="mt-2 text-sm sm:text-base text-gray-600">
              Track all your job applications in one place
            </p>
          </div>

          <form action={action} className="bg-white shadow-lg rounded-xl px-6 py-8 sm:px-10 sm:py-10 space-y-5 sm:space-y-6">
            <h2 className="text-2xl sm:text-3xl font-semibold text-center text-gray-900">
              Create your account
            </h2>

            {/* Name */}
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                Name
              </label>
              <div className="relative">
                <FaUser
                  className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400"
                />
                <input
                  className="w-full rounded-lg border border-gray-300 bg-gray-50 pl-10 pr-4 py-3 text-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition"
                  type="text"
                  name="name"
                  id="name"
                  placeholder="Enter your name"
                />
              </div>
              {state?.errors?.name && (
                <p className="mt-1 text-sm text-red-600">{state.errors.name}</p>
              )}
            </div>

            {/* Email */}
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                Email
              </label>
              <div className="relative">
                <MdEmail
                  className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400"
                />
                <input
                  className="w-full rounded-lg border border-gray-300 bg-gray-50 pl-10 pr-4 py-3 text-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition"
                  type="email"
                  name="email"
                  id="email"
                  placeholder="Enter your email"
                />
              </div>
              {state?.errors?.email && (
                <p className="mt-1 text-sm text-red-600">{state.errors.email}</p>
              )}
            </div>

            {/* Password */}
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                Password
              </label>
              <div className="relative">
                <RiLockPasswordFill
                  className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400"
                />
                <input
                  className="w-full rounded-lg border border-gray-300 bg-gray-50 pl-10 pr-4 py-3 text-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition"
                  type="password"
                  name="password"
                  id="password"
                  placeholder="Enter your password"
                />
              </div>
              {state?.errors?.password && (
                <div className="mt-2 text-sm text-red-600">
                  <p>Password must:</p>
                  <ul className="list-disc pl-5">
                    {state.errors.password.map((error) => (
                      <li key={error}>{error}</li>
                    ))}
                  </ul>
                </div>
              )}
            </div>

            {/* Confirm Password */}
            <div>
              <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-1">
                Confirm Password
              </label>
              <div className="relative">
                <RiLockPasswordFill
                  className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400"
                />
                <input
                  className="w-full rounded-lg border border-gray-300 bg-gray-50 pl-10 pr-4 py-3 text-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition"
                  type="password"
                  name="confirmPassword"
                  id="confirmPassword"
                  placeholder="Confirm your password"
                />
              </div>
              {state?.errors?.confirmPassword && (
                <div className="mt-2 text-sm text-red-600">
                  <p>Passwords must match:</p>
                  <ul className="list-disc pl-5">
                    {state.errors.confirmPassword.map((error) => (
                      <li key={error}>{error}</li>
                    ))}
                  </ul>
                </div>
              )}
            </div>

            {/* Submit Button */}
            <button
              className="w-full rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 mt-2 transition disabled:opacity-50 disabled:cursor-not-allowed"
              disabled={pending}
              type="submit"
            >
              Create Account
            </button>

            <p className="text-center text-sm text-gray-600">Or sign up with</p>

            <button
              type="button"
              className="w-full flex items-center justify-center gap-3 rounded-lg border border-gray-300 py-3 text-gray-700 hover:bg-gray-100 transition"
            >
              <FcGoogle className="h-5 w-5" />
              Sign up with Google
            </button>

            <p className="text-center text-sm text-gray-600">
              Already have an account?{' '}
              <Link href="/auth/signin" className="text-blue-600 hover:text-blue-800 font-medium">
                Sign in
              </Link>
            </p>
          </form>
        </div>
      </div>
    </>
  );
};

export default SignUp;