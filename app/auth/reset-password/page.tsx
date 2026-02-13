'use client';

import React, { useActionState } from 'react';
import Link from 'next/link';
import { RiLockPasswordFill } from 'react-icons/ri';
import { signup } from '@/app/lib/actions/auth'; // Note: probably should be resetPassword action?

const ResetPassword = () => {
  const [state, action, pending] = useActionState(signup, undefined); // ← Change to your actual reset action

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-gray-50 px-4 py-12 sm:px-6 lg:px-8">
      <div className="w-full max-w-md sm:max-w-lg md:max-w-xl space-y-8">
        {/* Header */}
        <div className="text-center">
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-900">AppTrackr</h1>
          <p className="mt-2 text-sm sm:text-base text-gray-600">
            Track all your job applications in one place
          </p>
        </div>

        {/* Form Card */}
        <form
          action={action}
          className="bg-white shadow-lg rounded-xl px-6 py-8 sm:px-10 sm:py-10 space-y-6"
        >
          <div className="text-center">
            <h2 className="text-2xl sm:text-3xl font-semibold text-gray-900">
              Set New Password
            </h2>
            <p className="mt-3 text-sm sm:text-base text-gray-600">
              Choose a secure password to keep your application data safe.
            </p>
          </div>

          {/* New Password */}
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
              New Password
            </label>
            <div className="relative">
              <RiLockPasswordFill className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
              <input
                className="w-full rounded-lg border border-gray-300 bg-gray-50 pl-10 pr-4 py-3 text-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition"
                type="password"
                name="password"
                id="password"
                placeholder="Enter your new password"
              />
            </div>

            {state?.errors?.password && (
              <div className="mt-2 text-sm text-red-600">
                <p>Password must:</p>
                <ul className="list-disc pl-5 space-y-1">
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
              Confirm New Password
            </label>
            <div className="relative">
              <RiLockPasswordFill className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
              <input
                className="w-full rounded-lg border border-gray-300 bg-gray-50 pl-10 pr-4 py-3 text-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition"
                type="password"
                name="confirmPassword"
                id="confirmPassword"
                placeholder="Confirm your new password"
              />
            </div>

            {state?.errors?.confirmPassword && (
              <div className="mt-2 text-sm text-red-600">
                <p>Passwords must match:</p>
                <ul className="list-disc pl-5 space-y-1">
                  {state.errors.confirmPassword.map((error) => (
                    <li key={error}>{error}</li>
                  ))}
                </ul>
              </div>
            )}
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={pending}
            className="w-full rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 transition disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {pending ? 'Updating password...' : 'Update Password'}
          </button>

          {/* Optional: Back to Login link */}
          <div className="text-center pt-2">
            <Link
              href="/auth/signin"
              className="text-sm text-blue-600 hover:text-blue-800 font-medium transition"
            >
              ← Back to Login
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ResetPassword;