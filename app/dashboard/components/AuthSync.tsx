'use client';

import { useEffect } from 'react';
import { useUser } from '@/app/context/UserContext';

export default function AuthSync() {
  const { refreshUser } = useUser();

  useEffect(() => {
    refreshUser();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return null;
}
