import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView } from 'react-native';
import foodLogStyles from '../styles/foodLogStyles';
import { getDailyLog } from '../services/api';
import { useUser } from '../context/userContext';
import { parseISO, startOfDay } from 'date-fns';

// Props for FoodLog component
interface FoodLogProps {
  date: string; // date in yyyy-MM-dd format
  onTotalsCalculated: (totals: { calories: number; fat: number; protein: number; carbs: number }) => void;
}

// Component to display food log
export default function FoodLog({ date, onTotalsCalculated }: FoodLogProps) {
  const { username } = useUser();
  const [foodData, setFoodData] = useState<{ food_item: string; food_cals: number; food_fat: number; food_protein: number; food_carbs: number }[]>([]);

  useEffect(() => {
    const fetchFoodLog = async () => {
      try {
        console.log('Date passed to FoodLog:', date);
        const data = await getDailyLog(username);

        // Convert device's local date to UTC
        const deviceDate = new Date(date);
        const utcDate = new Date(deviceDate.toUTCString());

        const filteredData = data.filter((item: { date: string }) => {
          const itemDate = startOfDay(parseISO(item.date)); 
          const selectedDate = startOfDay(utcDate); 
          return itemDate.getTime() === selectedDate.getTime();
        });

        setFoodData(filteredData);

        // Calculate totals
        const totals = filteredData.reduce(
          (acc: { calories: number; fat: number; protein: number; carbs: number; }, item: { food_cals: number; food_fat: number; food_protein: number; food_carbs: number; }) => {
            acc.calories += item.food_cals;
            acc.fat += item.food_fat;
            acc.protein += item.food_protein;
            acc.carbs += item.food_carbs;
            return acc;
          },
          { calories: 0, fat: 0, protein: 0, carbs: 0 }
        );

        // Pass totals to parent component
        onTotalsCalculated(totals);
      } catch (error) {
        console.error('Failed to fetch food log:', error);
      }
    };

    if (username) {
      fetchFoodLog();
    }
  }, [username, date]);

  return (
    <View style={foodLogStyles.container}>
      <Text style={foodLogStyles.title}>Food Log</Text>
      {/* ScrollView to allow scrolling if content exceeds screen height */}
      <ScrollView style={foodLogStyles.scrollContainer}>
        {foodData.map((food, index) => (
          <View key={index} style={foodLogStyles.foodItem}>
            <Text style={foodLogStyles.foodName}>{food.food_item || 'Unknown Item'}</Text>
            <Text style={foodLogStyles.foodCalories}>{food.food_cals} calories</Text>
          </View>
        ))}
      </ScrollView>
    </View>
  );
}