import React from 'react';
import { View, TouchableOpacity, Text } from 'react-native';
import { useRouter } from 'expo-router';
import styles from '../styles';

export const BottomNavigation = () => {
  const router = useRouter();

  return (
    <View style={styles.container}>
      {/* Your main content goes here */}
      <View style={styles.navbar}>
        <TouchableOpacity onPress={() => router.push('/home')} style={styles.navButton}>
          <Text style={styles.navButtonText}>Home</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => router.push('/search')} style={styles.navButton}>
          <Text style={styles.navButtonText}>Search</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => router.push('/scanner')} style={styles.navButton}>
          <Text style={styles.navButtonText}>Scanner</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};