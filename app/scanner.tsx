import React from 'react';
import { View, Text } from 'react-native';
import { BottomNavigation } from '../components/bottomNavigation';
import styles from '../styles';

export default function Scanner() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Barcode Scanner</Text>
      <Text style={styles.subtitle}>Scan barcodes for food details.</Text>
      <BottomNavigation />
    </View>
  );
}