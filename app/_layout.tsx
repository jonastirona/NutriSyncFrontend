import React from 'react';
import { Stack } from 'expo-router';
import { TamaguiProvider } from 'tamagui';
import tamaguiConfig from '../tamagui.config';

const Layout: React.FC = () => {
  return (
    <TamaguiProvider config={tamaguiConfig}>
      <Stack
        screenOptions={{
          headerShown: false,
        }}
      />
    </TamaguiProvider>
  );
};

export default Layout;