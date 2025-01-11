import React, { useState, useEffect } from 'react';
import { View, Text, ActivityIndicator, Button, SafeAreaView, Modal, TouchableOpacity } from 'react-native';
import { Camera, useCameraPermissions, CameraView } from 'expo-camera';
import { useUser } from '../context/userContext';
import { fetchFoodDataByBarcode } from '../services/api';
import scannerStyles from '../styles/scannerStyles';
import PercentageCircle from '../components/percentageCircle';
import PercentageBar from '../components/percentageBar';
import { BottomNavigation } from '../components/bottomNavigation';
import AddFood from '../components/addFood';
import styles from '../styles/styles';
import searchStyles from '../styles/searchStyles';

interface FoodData {
    calories: number;
    protein: number;
    fat: number;
    carbs: number;
    product_name?: string;
    error?: string;
}

const Scanner = () => {
    const [barcode, setBarcode] = useState<string | null>(null);
    const [foodData, setFoodData] = useState<FoodData | null>(null);
    const [loading, setLoading] = useState(false);
    const { username } = useUser();
    const [permission, requestPermission] = useCameraPermissions();
    const [cameraActive, setCameraActive] = useState(true);
    const [modalVisible, setModalVisible] = useState(false);
    const [message, setMessage] = useState<string | null>(null);

    useEffect(() => {
        if (!barcode) return;

        const fetchData = async () => {
            setLoading(true);
            try {
                const data = await fetchFoodDataByBarcode(barcode);
                if (data.status === 1) {
                    const nutrients = data.product.nutriments;
                    setFoodData({
                        calories: nutrients['energy-kcal_value'] || 0,
                        protein: nutrients['proteins_value'] || 0,
                        fat: nutrients['fat_value'] || 0,
                        carbs: nutrients['carbohydrates_value'] || 0,
                        product_name: data.product.product_name || 'Unknown Item'
                    });
                    setCameraActive(false);
                } else {
                    setFoodData({
                        calories: 0, protein: 0, fat: 0, carbs: 0,
                        error: 'No nutritional information found for this product.'
                    });
                }
            } catch (error) {
                setFoodData({
                    calories: 0, protein: 0, fat: 0, carbs: 0,
                    error: 'Connection error. Please try again.'
                });
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [barcode]);

    if (!permission) return <View />;

    if (!permission.granted) {
        return (
            <SafeAreaView style={styles.backgroundContainer}>
                <View style={scannerStyles.permissionContainer}>
                    <Text style={scannerStyles.subtitle}>Camera permission is required</Text>
                    <Button onPress={requestPermission} title="Grant Permission" />
                </View>
            </SafeAreaView>
        );
    }

    const handleBarcodeScanned = ({ data }: { type: string; data: string }) => {
        setBarcode(data);
    };

    const resetScanner = () => {
        setBarcode(null);
        setFoodData(null);
        setCameraActive(true);
    };

    const handleAddFoodResult = (success: boolean) => {
        setMessage(success ? 'Food added to log' : 'Failed to add food to log');
        setModalVisible(true);
        if (success) {
            resetScanner();
        }
    };

    return (
        <SafeAreaView style={styles.backgroundContainer}>
            <Text style={scannerStyles.title}>Nutrition Scanner</Text>
            
            <View style={styles.contentContainer}>
                {cameraActive ? (
                    <View style={scannerStyles.scannerSection}>
                        <View style={scannerStyles.cameraWrapper}>
                            <CameraView
                                style={scannerStyles.camera}
                                onBarcodeScanned={handleBarcodeScanned}
                                barcodeScannerSettings={{
                                    barcodeTypes: ['ean13']
                                }}
                            />
                            <View style={scannerStyles.overlay}>
                                <View style={scannerStyles.scanArea} />
                            </View>
                        </View>
                        <Text style={scannerStyles.subtitle}>
                            Place barcode within the frame
                        </Text>
                    </View>
                ) : (
                    <View style={scannerStyles.resultsSection}>
                        {loading ? (
                            <ActivityIndicator color="#709afc" size="large" />
                        ) : foodData?.error ? (
                            <View style={scannerStyles.errorContainer}>
                                <Text style={[scannerStyles.subtitle, { color: '#ff6b6b' }]}>{foodData.error}</Text>
                                <Button onPress={resetScanner} title="Scan Again" />
                            </View>
                        ) : (
                            <View style={scannerStyles.nutritionCard}>
                                <Text style={scannerStyles.title}>Nutrition Facts</Text>
                                <Text style={scannerStyles.subtitle}>{foodData?.product_name}</Text>
                                
                                <View style={styles.circleContainer}>
                                    <PercentageCircle
                                        label="Protein"
                                        value={foodData?.protein || 0}
                                    />
                                    <PercentageCircle
                                        label="Carbs"
                                        value={foodData?.carbs || 0}
                                    />
                                    <PercentageCircle
                                        label="Fat"
                                        value={foodData?.fat || 0}
                                    />
                                </View>

                                <PercentageBar
                                    label="Calories"
                                    value={foodData?.calories || 0}
                                />

                                <AddFood
                                    username={username}
                                    fooditem={foodData?.product_name || 'Unknown Item'}
                                    calories={foodData?.calories || 0}
                                    protein={foodData?.protein || 0}
                                    carbs={foodData?.carbs || 0}
                                    fat={foodData?.fat || 0}
                                    onPress={handleAddFoodResult}
                                />

                                <Button onPress={resetScanner} title="Scan Another" />
                            </View>
                        )}
                    </View>
                )}
            </View>
            <BottomNavigation />

            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => setModalVisible(false)}
            >
                <View style={searchStyles.centeredView}>
                    <View style={searchStyles.modalView}>
                        <Text style={searchStyles.modalText}>{message}</Text>
                        <TouchableOpacity
                            style={searchStyles.modalButton}
                            onPress={() => setModalVisible(false)}
                        >
                            <Text style={searchStyles.modalButtonText}>Dismiss</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>
        </SafeAreaView>
    );
}

export default Scanner;