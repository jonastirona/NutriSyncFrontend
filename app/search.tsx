import React from 'react';
import { View, Text } from 'react-native';
import { BottomNavigation } from '../components/bottomNavigation';
import styles from '../styles';

export default function Search() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Search</Text>
      <Text style={styles.subtitle}>Search for food information here.</Text>
      <BottomNavigation />
    </View>
  );
}