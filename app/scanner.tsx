import React, { useState, useEffect } from 'react';
import { View, Text, ActivityIndicator } from 'react-native';
import { RNCamera } from 'react-native-camera';
import styles from '../styles/styles';
import scannerStyles from '../styles/scannerStyles';
import { BottomNavigation } from '../components/bottomNavigation';
import PercentageCircle from '../components/percentageCircle';
import PercentageBar from '../components/percentageBar';
import AddFood from '../components/addFood';
import { fetchFoodDataByBarcode } from '../services/api';
import { useUser } from '../context/userContext';

// scanner component
const Scanner = () => {
    // state variables
    const [barcode, setBarcode] = useState<string | null>(null);
    const [foodData, setFoodData] = useState<any>(null);
    const [loading, setLoading] = useState(false);
    const { username } = useUser();

    // function to handle barcode scan
    const onCodeScanned = ({ data }: { data: string }) => {
        setBarcode(data);
    };

    // fetch food data when barcode changes
    useEffect(() => {
        if (barcode) {
            setLoading(true);
            const fetchFoodData = async () => {
                try {
                    const data = await fetchFoodDataByBarcode(barcode);
                    console.log(data);
                    if (data.status === 1) {
                        const nutrients = data.product.nutriments;
                        const calories = nutrients['energy-kcal_100g'] || 0;
                        const protein = nutrients['proteins_100g'] || 0;
                        const fat = nutrients['fat_100g'] || 0;
                        const carbs = nutrients['carbohydrates_100g'] || 0;
                        setFoodData({ calories, protein, fat, carbs });
                    } else {
                        setFoodData({ error: 'Could not find nutritional information for this product.' });
                    }
                } catch (error) {
                    console.error('Error fetching food data:', error);
                    setFoodData({ error: 'Failed to fetch food data. Please check your network connection.' });
                } finally {
                    setLoading(false);
                }
            };

            fetchFoodData();
        }
    }, [barcode]);

    // render the Scanner component
    return (
        <View style={styles.container}>
            {/* RNCamera component for barcode scanning */}
            <RNCamera
                style={scannerStyles.camera}
                onBarCodeRead={onCodeScanned}
                captureAudio={false}
            >
                {/* Scanner content */}
                <View style={scannerStyles.topContent}>
                    <Text style={styles.title}>Scan a barcode</Text>
                </View>
                <View style={scannerStyles.bottomContent}>
                    <Text style={styles.subtitle}>Align the barcode within the frame</Text>
                </View>
            </RNCamera>
            {/* Food data display */}
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                {loading && <ActivityIndicator size="large" color={styles.title.color} />}
                {foodData && foodData.error && <Text style={styles.subtitle}>{foodData.error}</Text>}
                {foodData && !foodData.error && (
                    <View style={styles.circleContainer}>
                        <View style={scannerStyles.circleValueContainer}>
                            <PercentageBar
                                label="Calories"
                                value={foodData.calories}
                            />
                        </View>
                        <View style={scannerStyles.circleValueContainer}>
                            <PercentageCircle
                                label="Fat"
                                percentage={foodData.fat ? parseFloat(foodData.fat.toFixed(1)) : 0}
                                value={foodData.fat}
                                circleStyle={scannerStyles.smallerCircle}
                                textStyle={scannerStyles.smallerCircleText}
                            />
                        </View>
                        <View style={scannerStyles.circleValueContainer}>
                            <PercentageCircle
                                label="Protein"
                                percentage={foodData.protein ? parseFloat(foodData.protein.toFixed(1)) : 0}
                                value={foodData.protein}
                                circleStyle={scannerStyles.smallerCircle}
                                textStyle={scannerStyles.smallerCircleText}
                            />
                        </View>
                        <View style={scannerStyles.circleValueContainer}>
                            <PercentageCircle
                                label="Carbs"
                                percentage={foodData.carbs ? parseFloat(foodData.carbs.toFixed(1)) : 0}
                                value={foodData.carbs}
                                circleStyle={scannerStyles.smallerCircle}
                                textStyle={scannerStyles.smallerCircleText}
                            />
                        </View>
                        <AddFood
                            username={username}
                            date={new Date().toISOString().split('T')[0]} // current date in YYYY-MM-DD format
                            fooditem={barcode || ''}
                            calories={foodData.calories}
                            protein={foodData.protein}
                            carbs={foodData.carbs}
                            fat={foodData.fat}
                            onPress={(success: boolean) => {
                                console.log('AddFood onPress called with success:', success);
                                // Handle success or failure of adding food to log
                            }}
                        />
                    </View>
                )}
            </View>

            <BottomNavigation />
        </View>
    );
};

export default Scanner;