import React, { createContext, useState, useContext, ReactNode } from 'react';

// user context type
interface UserContextType {
  username: string;
  setUsername: (username: string) => void;
  resetUsername: () => void;
}

// create a context
export const UserContext = createContext<UserContextType | undefined>(undefined);

// create provider component
export const UserProvider = ({ children }: { children: ReactNode }) => {
  const [username, setUsername] = useState<string>('');

  // function to reset username
  const resetUsername = () => {
    setUsername(() => {
      console.log('Username has been reset');
      return '';
    });
  };

  return (
    <UserContext.Provider value={{ username, setUsername, resetUsername }}>
      {children}
    </UserContext.Provider>
  );
};

// function to use user context
export const useUser = () => {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
};