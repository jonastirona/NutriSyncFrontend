import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView } from 'react-native';
import foodLogStyles from '../styles/foodLogStyles';
import { getDailyLog } from '../services/api';
import { useUser } from '../context/userContext';
import { format, parseISO } from 'date-fns';

// Props for FoodLog component
interface FoodLogProps {
  date: string; // date in yyyy-MM-dd format
}

// Component to display food log
export default function FoodLog({ date }: FoodLogProps) {
  const { username } = useUser();
  const [foodData, setFoodData] = useState<{ food_item: string; food_cals: number; }[]>([]);

  useEffect(() => {
    const fetchFoodLog = async () => {
      try {
        const data = await getDailyLog(username);
        const filteredData = data.filter((item: { date: string; }) => {
          const itemDate = format(parseISO(item.date), 'yyyy-MM-dd');
          return itemDate === date;
        });
        setFoodData(filteredData);
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