import React from 'react';
import { Stack } from 'expo-router';
import { TamaguiProvider } from 'tamagui';
import tamaguiConfig from '../tamagui.config';
import { UserProvider } from '../context/userContext';

// layout component to wrap the entire app
const Layout: React.FC = () => {
  return (
    <TamaguiProvider config={tamaguiConfig}>
      <UserProvider>
        <Stack
          screenOptions={{
            headerShown: false,
          }}
        />
      </UserProvider>
    </TamaguiProvider>
  );
};

export default Layout;