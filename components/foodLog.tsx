import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import styles from '../styles';

const foodData = [
  { name: 'Apple', calories: 95 },
  { name: 'Banana', calories: 105 },
  { name: 'Chicken Breast', calories: 165 },
  { name: 'Salad', calories: 150 },
  { name: 'Orange', calories: 62 },
  { name: 'Yogurt', calories: 59 },
  { name: 'Steak', calories: 679 },
  { name: 'Rice', calories: 206 },
  { name: 'Broccoli', calories: 55 },
  { name: 'Milk', calories: 103 },
];

export default function FoodLog() {
  return (
    <View style={localStyles.container}>
      <Text style={localStyles.title}>Food Log</Text>
      <ScrollView style={localStyles.scrollContainer}>
        {foodData.map((food, index) => (
          <View key={index} style={localStyles.foodItem}>
            <Text style={localStyles.foodName}>{food.name}</Text>
            <Text style={localStyles.foodCalories}>{food.calories} kcal</Text>
          </View>
        ))}
      </ScrollView>
    </View>
  );
}

const localStyles = StyleSheet.create({
  container: {
    margin: 10,
    backgroundColor: '#2D2D44',
    borderRadius: 10,
    padding: 10,
  },
  title: {
    fontSize: 18,
    marginBottom: 10,
    color: '#D4A5FF',
    textAlign: 'center',
  },
  scrollContainer: {
    maxHeight: 200,
  },
  foodItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 5,
    padding: 10,
    backgroundColor: '#1A1A2E',
    borderRadius: 5,
  },
  foodName: {
    fontSize: 16,
    color: '#A390E4',
  },
  foodCalories: {
    fontSize: 16,
    color: '#76c7c0',
  },
});