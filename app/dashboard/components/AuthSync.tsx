'use client';

import { useEffect } from 'react';
import { useUser } from '@/app/context/UserContext';

export default function AuthSync() {
  const { refreshUser } = useUser();

  useEffect(() => {
    refreshUser();
  }, []);

  return null;
}
