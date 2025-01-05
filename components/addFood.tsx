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
    onPress: (success: boolean) => void;
}

// AddFood component
const AddFood: React.FC<AddFoodProps> = ({ username, date, fooditem, calories, protein, carbs, fat, onPress }) => {
    console.log('AddFood component rendered with props:', { username, date, fooditem, calories, protein, carbs, fat }); // Log when the component is rendered

    // function to handle the button press
    const handlePress = async () => {
        console.log('Button pressed'); // Log when the button is pressed
        try {
            const logData = { username, date, fooditem, calories, protein, carbs, fat };
            console.log('Sending data to backend:', logData); // Log the data being sent to the backend
            await updateDailyLog(logData);
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