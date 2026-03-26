"use client";

import React from "react";
import { AuthInputProps } from "../types";

export const AuthInput = ({
  label,
  icon: Icon,
  error,
  id,
  className = "",
  ...props
}: AuthInputProps) => {
  const errorMessage = Array.isArray(error) ? error.join(", ") : error;

  return (
    <div className="w-full">
      <label
        htmlFor={id}
        className="block text-sm font-medium text-gray-700 mb-1.5"
      >
        {label}
      </label>
      <div className="relative group">
        <div className="absolute left-3 top-1/2 -translate-y-1/2 transition-colors duration-200 text-gray-400 group-focus-within:text-blue-500">
          <Icon className="h-5 w-5" />
        </div>
        <input
          id={id}
          className={`w-full rounded-xl border border-gray-200 bg-gray-50/50 pl-11 pr-4 py-3.5 text-sm 
            placeholder:text-gray-400
            focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 focus:bg-white
            outline-none transition-all duration-200
            ${error ? "border-red-500 focus:border-red-500 focus:ring-red-500/10" : ""} 
            ${className}`}
          {...props}
        />
      </div>
      {errorMessage && (
        <p className="mt-1.5 text-xs font-medium text-red-500 ml-1">
          {errorMessage}
        </p>
      )}
    </div>
  );
};
