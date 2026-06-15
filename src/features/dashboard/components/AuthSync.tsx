"use client";

import React, { useState, useEffect } from "react";

export const AuthSync = () => {
  // Sync logic from original AuthSync
  useEffect(() => {
    const syncAuth = async () => {
      try {
        await fetch("/api/me");
      } catch (error) {
        console.error("Auth sync failed", error);
      }
    };
    syncAuth();
  }, []);

  return null;
};
