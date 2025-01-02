import React from 'react';
import { TouchableOpacity, Text } from 'react-native';
import addFoodStyles from '../styles/addFoodStyles';

interface AddFoodProps {
    onPress: () => void;
}

const AddFood: React.FC<AddFoodProps> = ({ onPress }) => {
    return (
        <TouchableOpacity style={addFoodStyles.button} onPress={onPress}>
            <Text style={addFoodStyles.buttonText}>Add to Food Log</Text>
        </TouchableOpacity>
    );
};

export default AddFood;