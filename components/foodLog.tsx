import React from 'react';
import { View, Text, ScrollView } from 'react-native';
import foodLogStyles from '../styles/foodLogStyles';

// arbitrary data for display purposes
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

// Component to display food log
export default function FoodLog() {
  return (
    <View style={foodLogStyles.container}>
      <Text style={foodLogStyles.title}>Food Log</Text>
      {/* ScrollView to allow scrolling if content exceeds screen height */}
      <ScrollView style={foodLogStyles.scrollContainer}>
        {foodData.map((food, index) => (
          <View key={index} style={foodLogStyles.foodItem}>
            <Text style={foodLogStyles.foodName}>{food.name}</Text>
            <Text style={foodLogStyles.foodCalories}>{food.calories} kcal</Text>
          </View>
        ))}
      </ScrollView>
    </View>
  );
}