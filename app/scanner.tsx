import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ActivityIndicator } from 'react-native';
import QRCodeScanner from 'react-native-qrcode-scanner';
import styles from '../styles';
import { BottomNavigation } from '../components/bottomNavigation';
import PercentageCircle from '../components/percentageCircle';
import PercentageBar from '../components/percentageBar';

const Scanner = () => {
    const [barcode, setBarcode] = useState<string | null>(null);
    const [foodData, setFoodData] = useState<any>(null);
    const [loading, setLoading] = useState(false);

    const onCodeScanned = (e: any) => {
        setBarcode(e.data);
    };

    useEffect(() => {
        if (barcode) {
            setLoading(true);
            const fetchFoodData = async () => {
                try {
                    const response = await fetch(
                        `http://nutrisyncbackend-env.eba-2wtn6ifs.us-east-2.elasticbeanstalk.com/barcode?barcode=${barcode}`,
                    );
                    if (response.ok) {
                        const data = await response.json();
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
                    } else {
                        console.error('Failed to fetch food data:', response.status);
                        setFoodData({ error: 'Failed to fetch food data. Please try again later.' });
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

    return (
        <View style={styles.container}>
            <QRCodeScanner
                onRead={onCodeScanned}
                topContent={<Text style={styles.title}>Scan a barcode</Text>}
                bottomContent={<Text style={styles.subtitle}>Align the barcode within the frame</Text>}
            />

            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                {loading && <ActivityIndicator size="large" color={styles.title.color} />}
                {foodData && foodData.error && <Text style={styles.subtitle}>{foodData.error}</Text>}
                {foodData && !foodData.error && (
                    <View style={styles.circleContainer}>
                        <View style={localStyles.circleValueContainer}>
                             <PercentageBar
                                 label="Calories"
                                 percentage={foodData.calories ? parseFloat(foodData.calories.toFixed(1)) : 0}
                                 value = {foodData.calories}
                             />
                        </View>
                        <View style={localStyles.circleValueContainer}>
                            <PercentageCircle
                                label="Fat"
                                percentage={foodData.fat ? parseFloat(foodData.fat.toFixed(1)) : 0}
                                value = {foodData.fat}
                                circleStyle = {localStyles.smallerCircle}
                                textStyle = {localStyles.smallerCircleText}
                            />
                        </View>
                         <View style={localStyles.circleValueContainer}>
                            <PercentageCircle
                                label="Protein"
                                percentage={foodData.protein ? parseFloat(foodData.protein.toFixed(1)) : 0}
                                value = {foodData.protein}
                                circleStyle = {localStyles.smallerCircle}
                                textStyle = {localStyles.smallerCircleText}
                            />
                         </View>
                        <View style={localStyles.circleValueContainer}>
                            <PercentageCircle
                                label="Carbs"
                                percentage={foodData.carbs ? parseFloat(foodData.carbs.toFixed(1)) : 0}
                                value = {foodData.carbs}
                                circleStyle = {localStyles.smallerCircle}
                                textStyle = {localStyles.smallerCircleText}
                            />
                        </View>
                    </View>
                )}
            </View>

            <BottomNavigation />
        </View>
    );
};

const localStyles = StyleSheet.create({
    circleValueContainer:{
        alignItems: 'center',
        marginBottom: 10,
    },
      smallerCircle:{
        width: 50,
        height: 50,
        borderRadius: 50,
        borderWidth: 5,
    },
    smallerCircleText:{
        fontSize: 16,
    },
});

export default Scanner;