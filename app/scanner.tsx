import React, { useState, useEffect } from 'react';
import { View, Text, ActivityIndicator, Button, SafeAreaView } from 'react-native';
import { Camera, CameraType, BarcodeScanningResult, useCameraPermissions, CameraView } from 'expo-camera';
import styles from '../styles/styles';
import scannerStyles from '../styles/scannerStyles';
import { BottomNavigation } from '../components/bottomNavigation';
import PercentageCircle from '../components/percentageCircle';
import PercentageBar from '../components/percentageBar';
import AddFood from '../components/addFood';
import { fetchFoodDataByBarcode } from '../services/api';
import { useUser } from '../context/userContext';

interface FoodData {
    calories: number;
    protein: number;
    fat: number;
    carbs: number;
    error?: string;
}

const Scanner = () => {
    const [barcode, setBarcode] = useState<string | null>(null);
    const [foodData, setFoodData] = useState<FoodData | null>(null);
    const [loading, setLoading] = useState(false);
    const { username } = useUser();
    const [permission, requestPermission] = useCameraPermissions();
    const [cameraActive, setCameraActive] = useState(true);

    useEffect(() => {
        if (barcode) {
            setLoading(true);
            const fetchFoodData = async () => {
                try {
                    const data = await fetchFoodDataByBarcode(barcode);
                    if (data.status === 1) {
                        const nutrients = data.product.nutriments;
                        const calories = nutrients['energy-kcal_value'] || 0;
                        const protein = nutrients['proteins_value'] || 0;
                        const fat = nutrients['fat_value'] || 0;
                        const carbs = nutrients['carbohydrates_value'] || 0;
                        setFoodData({ calories, protein, fat, carbs });
                        setCameraActive(false);
                    } else {
                        setFoodData({
                            calories: 0,
                            protein: 0,
                            fat: 0,
                            carbs: 0,
                            error: 'Could not find nutritional information for this product.'
                        });
                    }
                } catch (error) {
                    setFoodData({
                        calories: 0,
                        protein: 0,
                        fat: 0,
                        carbs: 0,
                        error: 'Failed to fetch food data. Please check your network connection.'
                    });
                } finally {
                    setLoading(false);
                }
            };
    
            fetchFoodData();
        }
    }, [barcode]);

    if (!permission) {
        return <View />;
    }

    if (!permission.granted) {
        return (
            <SafeAreaView style={styles.container}>
                <Text style={styles.subtitle}>We need your permission to show the camera</Text>
                <Button onPress={requestPermission} title="Grant Permission" />
            </SafeAreaView>
        );
    }

    const handleBarcodeScanned = ({ type, data }: BarcodeScanningResult) => {
        setBarcode(data);
    };

    return (
        <SafeAreaView style={styles.container}>
            <View style={scannerStyles.mainContent}>
                <Text style={scannerStyles.headerTitle}>Barcode Scanner</Text>
                
                {cameraActive && (
                    <>
                        <View style={scannerStyles.cameraContainer}>
                            <CameraView
                                style={scannerStyles.camera}
                                onBarcodeScanned={handleBarcodeScanned}
                                barcodeScannerSettings={{
                                    barcodeTypes: ['ean13']
                                }}
                            />
                        </View>
                        <Text style={scannerStyles.instructionText}>
                            Align a barcode within the frame to get food info.
                        </Text>
                    </>
                )}

                {!cameraActive && (
                    <View style={scannerStyles.resultsContainer}>
                        {loading && <ActivityIndicator color="#fff" style={scannerStyles.loadingIndicator} />}
                        {foodData?.error && <Text style={scannerStyles.errorText}>{foodData.error}</Text>}
                        {foodData && !foodData.error && (
                            <>
                                <View style={scannerStyles.circleContainer}>
                                    <View style={scannerStyles.circleValueContainer}>
                                        <PercentageCircle
                                            label="Fat"
                                            value={foodData.fat}
                                        />
                                    </View>
                                    <View style={scannerStyles.circleValueContainer}>
                                        <PercentageCircle
                                            label="Protein"
                                            value={foodData.protein}
                                        />
                                    </View>
                                    <View style={scannerStyles.circleValueContainer}>
                                        <PercentageCircle
                                            label="Carbs"
                                            value={foodData.carbs}
                                        />
                                    </View>
                                </View>
                                <View style={scannerStyles.percentageBarContainer}>
                                    <PercentageBar
                                        label="Calories"
                                        value={foodData.calories}
                                    />
                                </View>
                                <View style={scannerStyles.addFoodContainer}>
                                    <AddFood
                                        username={username}
                                        fooditem={barcode || ''}
                                        calories={foodData.calories}
                                        protein={foodData.protein}
                                        carbs={foodData.carbs}
                                        fat={foodData.fat}
                                        onPress={(success: boolean) => {
                                            console.log('AddFood onPress called with success:', success);
                                        }}
                                    />
                                </View>
                            </>
                        )}
                    </View>
                )}
            </View>
            <BottomNavigation />
        </SafeAreaView>
    );
};

export default Scanner;