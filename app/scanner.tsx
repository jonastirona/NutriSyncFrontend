import React, { useState, useEffect, useRef } from 'react';
import { View, Text, StyleSheet, Button, AppState } from 'react-native';
import {
  Camera,
  useCameraDevices,
  useFrameProcessor,
} from 'react-native-vision-camera';
import { scanBarcodes, BarcodeFormat } from 'vision-camera-code-scanner';
import { BottomNavigation } from '../components/bottomNavigation';
import PercentageCircle from '../components/percentageCircle';
import styles from '../styles';
import 'react-native-reanimated';
import { runOnJS } from 'react-native-reanimated';

interface FoodNutrient {
  nutrientName: string;
  value: number;
}

interface FoodInfo {
  description: string;
  foodNutrients: FoodNutrient[];
}

export default function Scanner() {
  const [hasPermission, setHasPermission] = useState(false);
  const [scanned, setScanned] = useState(false);
  const [foodInfo, setFoodInfo] = useState<FoodInfo | null>(null);
  const cameraRef = useRef<Camera>(null);
  const devices = useCameraDevices();
  const device = devices?.find(device => device.position === 'back');

  const frameProcessor = useFrameProcessor(frame => {
    'worklet';
    if (scanned) return;
    const detectedBarcodes = scanBarcodes(frame, [
      BarcodeFormat.EAN_13,
      BarcodeFormat.UPC_A,
      BarcodeFormat.UPC_E,
    ]);

    if (detectedBarcodes.length > 0) {
      const barcodeData = detectedBarcodes[0].displayValue;
      if (barcodeData) {
        console.log('Scanned barcode:', barcodeData);
        setScanned(true);
        runOnJS(handleBarCodeScanned)({
          type: 'barcode',
          data: barcodeData,
        });
      }
    }
  }, []);

  useEffect(() => {
    (async () => {
      const status = await Camera.requestCameraPermission();
      setHasPermission(status === 'granted');
    })();
  }, []);

  useEffect(() => {
    const subscription = AppState.addEventListener('change', nextAppState => {
      if (nextAppState === 'active') {
        setScanned(false);
      }
    });

    return () => {
      subscription.remove();
    };
  }, []);

  const handleBarCodeScanned = async ({ type, data }: { type: string; data: string }) => {
    try {
      const response = await fetch(`http://nutrisyncbackend-env.eba-2wtn6ifs.us-east-2.elasticbeanstalk.com/barcode?barcode=${data}`);
      const foodData: FoodInfo = await response.json();
      setFoodInfo(foodData);
    } catch (error) {
      console.error('Error fetching food data:', error);
    }
  };

  if (device == null) return <Text>No camera available</Text>;

  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Barcode Scanner</Text>
      <Text style={styles.subtitle}>Scan barcodes for food details.</Text>
      <View style={localStyles.scannerContainer}>
        <Camera
          ref={cameraRef}
          style={StyleSheet.absoluteFill}
          device={device}
          isActive={true}
          frameProcessor={frameProcessor}
        />
        {scanned && (
          <Button title={'Tap to Scan Again'} onPress={() => setScanned(false)} />
        )}
      </View>
      {foodInfo && (
        <View style={localStyles.foodInfoContainer}>
          <Text style={localStyles.foodTitle}>{foodInfo.description}</Text>
          <View style={localStyles.percentageContainer}>
            <PercentageCircle
              label="Fat"
              percentage={foodInfo.foodNutrients.find(n => n.nutrientName === 'Total lipid (fat)')?.value || 0}
            />
            <PercentageCircle
              label="Carbs"
              percentage={foodInfo.foodNutrients.find(n => n.nutrientName === 'Carbohydrate, by difference')?.value || 0}
            />
            <PercentageCircle
              label="Protein"
              percentage={foodInfo.foodNutrients.find(n => n.nutrientName === 'Protein')?.value || 0}
            />
          </View>
        </View>
      )}
      <BottomNavigation />
    </View>
  );
}

const localStyles = StyleSheet.create({
  scannerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 20,
    width: '80%',
    height: '50%',
  },
  camera: {
    flex: 1,
    width: '100%',
  },
  foodInfoContainer: {
    marginTop: 20,
    alignItems: 'center',
  },
  foodTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: styles.title.color,
    marginBottom: 10,
  },
  percentageContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
  },
});