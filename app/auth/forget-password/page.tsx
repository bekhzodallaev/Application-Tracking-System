'use client';

import { MdEmail } from 'react-icons/md';
import React, { useActionState } from 'react';
import Link from 'next/link';
import { resetPasswordLink } from '@/app/lib/actions/auth';

const ForgotPassword = () => {
  const [state, action, pending] = useActionState(resetPasswordLink, undefined);

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
              Forgot your password?
            </h2>
            <p className="mt-3 text-sm sm:text-base text-gray-600">
              No worries! Enter your registered email address below and we will send you instructions to reset it.
            </p>
          </div>

          {/* Email Field */}
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
              Email address
            </label>
            <div className="relative">
              <MdEmail className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
              <input
                className="w-full rounded-lg border border-gray-300 bg-gray-50 pl-10 pr-4 py-3 text-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition"
                type="email"
                name="email"
                id="email"
                placeholder="Enter your email"
              />
            </div>

            {state?.errors?.email && (
              <div className="mt-2 text-sm text-red-600">
                {Array.isArray(state.errors.email)
                  ? state.errors.email.map((err) => <p key={err}>{err}</p>)
                  : state.errors.email}
              </div>
            )}
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={pending}
            className="w-full rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 transition disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {pending ? 'Sending reset link...' : 'Send reset link'}
          </button>

          {/* Back to Login */}
          <div className="text-center">
            <Link
              href="/auth/signin"
              className="inline-flex items-center gap-2 text-sm text-blue-600 hover:text-blue-800 font-medium transition"
            >
              ← Back to Login
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ForgotPassword;