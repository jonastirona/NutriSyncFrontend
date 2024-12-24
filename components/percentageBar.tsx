import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import styles from '../styles';

interface PercentageBarProps {
  label: string;
  percentage: number;
}

export default function PercentageBar({ label, percentage }: PercentageBarProps) {
  return (
    <View style={localStyles.container}>
      <Text style={localStyles.label}>{label}</Text>
      <View style={localStyles.barContainer}>
        <View style={[localStyles.bar, { width: `${percentage}%` }]} />
      </View>
      <Text style={localStyles.percentage}>{percentage}%</Text>
    </View>
  );
}

const localStyles = StyleSheet.create({
  container: {
    margin: 10,
  },
  label: {
    fontSize: 16,
    marginBottom: 5,
    color: styles.title.color,
  },
  barContainer: {
    height: 20,
    backgroundColor: '#e0e0e0',
    borderRadius: 10,
    overflow: 'hidden',
  },
  bar: {
    height: '100%',
    backgroundColor: styles.button.backgroundColor,
  },
  percentage: {
    fontSize: 16,
    marginTop: 5,
    color: styles.title.color,
  },
});