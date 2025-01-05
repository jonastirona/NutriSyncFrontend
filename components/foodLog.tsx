import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView } from 'react-native';
import foodLogStyles from '../styles/foodLogStyles';
import { getDailyLog } from '../services/api';
import { useUser } from '../context/userContext';
import { format, parseISO } from 'date-fns';

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
        const data = await getDailyLog(username);
        const filteredData = data.filter((item: { date: string; }) => {
          const itemDate = format(parseISO(item.date), 'yyyy-MM-dd');
          return itemDate === date;
        });
        setFoodData(filteredData);

        // Calculate totals
        const totals = filteredData.reduce(
          (acc: { calories: any; fat: any; protein: any; carbs: any; }, item: { food_cals: any; food_fat: any; food_protein: any; food_carbs: any; }) => {
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
            <Text style={foodLogStyles.foodName}>{food.food_item}</Text>
            <Text style={foodLogStyles.foodCalories}>{food.food_cals} calories</Text>
          </View>
        ))}
      </ScrollView>
    </View>
  );
}