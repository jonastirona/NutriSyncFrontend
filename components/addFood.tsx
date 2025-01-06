import React from 'react';
import { TouchableOpacity, Text } from 'react-native';
import addFoodStyles from '../styles/addFoodStyles';
import { updateDailyLog } from '../services/api';
import { format, toZonedTime } from 'date-fns-tz';

// AddFoodProps interface
interface AddFoodProps {
    username: string;
    fooditem: string;
    calories: number;
    protein: number;
    carbs: number;
    fat: number;
    onPress: (success: boolean) => void;
}

// Function to convert UTC date to a specific timezone
const convertUTCToTimezone = (date: Date, timeZone: string) => {
  const zonedDate = toZonedTime(date, timeZone);
  return format(zonedDate, 'yyyy-MM-dd', { timeZone });
};

// AddFood component
const AddFood: React.FC<AddFoodProps> = ({ username, fooditem, calories, protein, carbs, fat, onPress }) => {
    const deviceTimeZone = Intl.DateTimeFormat().resolvedOptions().timeZone; // Get device's timezone
    const currentDate = convertUTCToTimezone(new Date(), deviceTimeZone); // Use today's date in the device's timezone

    console.log('AddFood component rendered with props:', { username, date: currentDate, fooditem, calories, protein, carbs, fat }); // Log when the component is rendered

    // function to handle the button press
    const handlePress = async () => {
        console.log('Button pressed'); // Log when the button is pressed
        try {
            console.log('Sending data to backend:', { username, date: currentDate, fooditem, calories, protein, carbs, fat }); // Log the data being sent to the backend
            await updateDailyLog(username, currentDate, fooditem, calories, protein, carbs, fat);
            onPress(true);
        } catch (error) {
            console.error('Error updating daily log:', error);
            onPress(false);
        }
    };

    // return the AddFood component
    return (
        <TouchableOpacity style={addFoodStyles.button} onPress={handlePress}>
            <Text style={addFoodStyles.buttonText}>Add to Food Log</Text>
        </TouchableOpacity>
    );
};

export default AddFood;