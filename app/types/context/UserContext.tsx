'use client';

import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';

type User = {
  name: string;
  email: string;
  avatarPublicId?: string | null;
};

type UserContextType = {
  user: User | null;
  setUser: (user: User) => void;
  refreshUser: () => void;
};

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);

  // Function to fetch user data from API
  const refreshUser = async () => {
    try {
      const res = await fetch('/api/settings/gmail');
      if (!res.ok) return;
      const data = await res.json();
      setUser({
        name: data.name,
        email: data.email,
        avatarPublicId: data.avatar?.publicId || null,
      });
    } catch (error) {
      console.error('Failed to fetch user', error);
    }
  };

  // Load user on first mount
  useEffect(() => {
    refreshUser();
  }, []);

  return (
    <UserContext.Provider value={{ user, setUser, refreshUser }}>
      {children}
    </UserContext.Provider>
  );
};

// Custom hook for easier access
export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) throw new Error('useUser must be used within a UserProvider');
  return context;
};
