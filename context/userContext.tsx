import React, { createContext, useState, useContext, ReactNode } from 'react';

// user context type
interface UserContextType {
  username: string;
  setUsername: (username: string) => void;
}

// create a context
const UserContext = createContext<UserContextType | undefined>(undefined);

// create provider component
export const UserProvider = ({ children }: { children: ReactNode }) => {
    // set username state
  const [username, setUsername] = useState<string>('');

  return (
    <UserContext.Provider value={{ username, setUsername }}>
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