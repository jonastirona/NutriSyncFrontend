import React from 'react';
import { View, Text } from 'react-native';
import { BottomNavigation } from '../components/bottomNavigation';
import styles from '../styles';

export default function Home() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Home</Text>
      <Text style={styles.subtitle}>Welcome to your dashboard!</Text>
      <BottomNavigation />
    </View>
  );
}