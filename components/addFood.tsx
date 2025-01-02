import React from 'react';
import { TouchableOpacity, Text } from 'react-native';
import addFoodStyles from '../styles/addFoodStyles';
import { updateDailyLog } from '../services/api';

// AddFoodProps interface
interface AddFoodProps {
    username: string;
    date: string;
    fooditem: string;
    calories: number;
    protein: number;
    carbs: number;
    fat: number;
    onPress: () => void;
}

// AddFood component
const AddFood: React.FC<AddFoodProps> = ({ username, date, fooditem, calories, protein, carbs, fat, onPress }) => {
    // function to handle the button press
    const handlePress = async () => {
        try {
            const logData = { username, date, fooditem, calories, protein, carbs, fat };
            await updateDailyLog(logData);
            onPress();
        } catch (error) {
            console.error('Error updating daily log:', error);
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