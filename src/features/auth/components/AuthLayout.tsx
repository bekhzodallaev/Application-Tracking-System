"use client";

import Link from "next/link";
import React from "react";

interface AuthLayoutProps {
  children: React.ReactNode;
  title: string;
  subtitle: string;
}

export const AuthLayout = ({ children, title, subtitle }: AuthLayoutProps) => {
  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-gray-50 px-4 py-12 sm:px-6 lg:px-8 font-sans">
      <div className="w-full max-w-md sm:max-w-lg md:max-w-xl space-y-8">
        <div className="text-center">
          <Link href="/">
            <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 hover:text-blue-600 transition duration-300">
              AppTrackr
            </h1>
          </Link>
          <p className="mt-2 text-sm sm:text-base text-gray-600">
            Track all your job applications in one place
          </p>
        </div>

        <div className="bg-white shadow-xl rounded-2xl px-6 py-8 sm:px-10 sm:py-10 border border-gray-100">
          <div className="text-center mb-8">
            <h2 className="text-2xl sm:text-3xl font-semibold text-gray-900">
              {title}
            </h2>
            <p className="mt-3 text-sm sm:text-base text-gray-600">
              {subtitle}
            </p>
          </div>
          {children}
        </div>
      </div>
    </div>
  );
};
