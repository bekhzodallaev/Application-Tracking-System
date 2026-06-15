"use client";

import React from "react";
import { FcGoogle } from "react-icons/fc";

interface SocialAuthProps {
  label: string;
  onClick?: () => void;
}

export const SocialAuth = ({ label, onClick }: SocialAuthProps) => {
  return (
    <div className="space-y-4">
      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-gray-200"></div>
        </div>
        <div className="relative flex justify-center text-sm">
          <span className="px-2 bg-white text-gray-500 uppercase tracking-wider text-xs font-semibold">
            Or {label} with
          </span>
        </div>
      </div>

      <button
        type="button"
        onClick={onClick}
        className="w-full flex items-center justify-center gap-3 rounded-xl border border-gray-200 py-3.5 
          text-gray-700 font-medium hover:bg-gray-50 hover:border-gray-300 transition-all duration-200 
          shadow-sm active:scale-[0.98]"
      >
        <FcGoogle className="h-5 w-5" />
        <span>Google</span>
      </button>
    </div>
  );
};
