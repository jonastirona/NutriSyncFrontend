import React, { useState, useEffect } from 'react';
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    FlatList,
    ActivityIndicator,
    Modal,
    StyleSheet,
} from 'react-native';
import { BottomNavigation } from '../components/bottomNavigation';
import PercentageCircle from '../components/percentageCircle';
import PercentageBar from '../components/percentageBar';
import AddFood from '../components/addFood';
import styles from '../styles/styles';
import searchStyles from '../styles/searchStyles';
import { searchFood, loadMoreResults } from '../services/api';

// interface for food nutrient
interface FoodNutrient {
    nutrientName: string;
    value: number;
}

// interface for food item
interface FoodItem {
    fdcId: number;
    description: string;
    foodNutrients: FoodNutrient[];
}

// SearchScreen component
const SearchScreen = () => {
    // state variables
    const [keyword, setKeyword] = useState('');
    const [searchResults, setSearchResults] = useState<FoodItem[]>([]);
    const [expandedItem, setExpandedItem] = useState<number | null>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [searchPage, setSearchPage] = useState(1);
    const [hasMore, setHasMore] = useState(true);
    const [message, setMessage] = useState<string | null>(null);
    const [modalVisible, setModalVisible] = useState(false);
    const pageSize = 10;

    // function to reset states
    const resetStates = () => {
        setSearchResults([]);
        setExpandedItem(null);
        setSearchPage(1);
        setHasMore(true);
    };

    // function to handle search food
    const handleSearchFood = async () => {
        setLoading(true);
        setError('');
        resetStates();
        try {
            const data = await searchFood(keyword, 1, pageSize);
            if (data.foods.length === 0) {
                setError('No food items found. Please try another search');
            } else {
                setSearchResults(data.foods);
                if (data.foods.length < pageSize) {
                    setHasMore(false);
                }
            }
        } catch (error: any) {
            setError(`Error fetching data: ${error.message}`);
            console.error('Error fetching food data:', error);
        } finally {
            setLoading(false);
        }
    };

    // function to handle load more results
    const handleLoadMoreResults = async () => {
        if (!keyword || loading || !hasMore) return;
        setLoading(true);
        try {
            const nextPage = searchPage + 1;
            const data = await loadMoreResults(keyword, nextPage, pageSize);
            if (data.foods.length > 0) {
                setSearchResults([...searchResults, ...data.foods]);
                setSearchPage(nextPage);
                if (data.foods.length < pageSize) {
                    setHasMore(false);
                }
            } else {
                setHasMore(false);
            }
        } catch (error: any) {
            console.error('Error fetching more data', error);
            setError(`Error fetching more data: ${error.message}`);
        } finally {
            setLoading(false);
        }
    };

    // function to toggle expand item
    const toggleExpand = (index: number) => {
        setExpandedItem(expandedItem === index ? null : index);
    };

    // function to render item
    const renderItem = ({ item, index }: { item: FoodItem; index: number }) => (
        <View style={searchStyles.itemContainer}>
            <TouchableOpacity onPress={() => toggleExpand(index)}>
                <Text style={searchStyles.itemTitle}>{item.description}</Text>
            </TouchableOpacity>
            {expandedItem === index && (
                <View style={searchStyles.dropdown}>
                    <View style={searchStyles.percentageContainer}>
                        <PercentageCircle
                            label="Fat"
                            percentage={
                                item.foodNutrients.find((n) => n.nutrientName === 'Total lipid (fat)')?.value || 0
                            }
                            value={
                                item.foodNutrients.find((n) => n.nutrientName === 'Total lipid (fat)')?.value
                            }
                            circleStyle={searchStyles.smallerCircle}
                            textStyle={searchStyles.smallerCircleText}
                        />
                        <PercentageCircle
                            label="Protein"
                            percentage={
                                item.foodNutrients.find((n) => n.nutrientName === 'Protein')?.value || 0
                            }
                            value={
                                item.foodNutrients.find((n) => n.nutrientName === 'Protein')?.value
                            }
                            circleStyle={searchStyles.smallerCircle}
                            textStyle={searchStyles.smallerCircleText}
                        />
                        <PercentageCircle
                            label="Carbohydrates"
                            percentage={
                                item.foodNutrients.find(
                                    (n) => n.nutrientName === 'Carbohydrate, by difference',
                                )?.value || 0
                            }
                            value={
                                item.foodNutrients.find(
                                    (n) => n.nutrientName === 'Carbohydrate, by difference',
                                )?.value
                            }
                            circleStyle={searchStyles.smallerCircle}
                            textStyle={searchStyles.smallerCircleText}
                        />
                    </View>
                    <View style={searchStyles.calorieContainer}>
                        <PercentageBar
                            label="Calories"
                            percentage={
                                item.foodNutrients.find((n) => n.nutrientName === 'Energy')?.value || 0
                            }
                            value={
                                item.foodNutrients.find((n) => n.nutrientName === 'Energy')?.value
                            }
                        />
                    </View>
                    {/* AddFood component */}
                    <AddFood
                        username="username" // replace with actual username
                        date={new Date().toISOString().split('T')[0]} // current date in YYYY-MM-DD format
                        fooditem={item.description}
                        calories={item.foodNutrients.find((n) => n.nutrientName === 'Energy')?.value || 0}
                        protein={item.foodNutrients.find((n) => n.nutrientName === 'Protein')?.value || 0}
                        carbs={item.foodNutrients.find((n) => n.nutrientName === 'Carbohydrate, by difference')?.value || 0}
                        fat={item.foodNutrients.find((n) => n.nutrientName === 'Total lipid (fat)')?.value || 0}
                        onPress={(success: boolean) => {
                            setMessage(success ? 'Food added to log' : 'Failed to add food to log');
                            setModalVisible(true);
                        }}
                    />
                </View>
            )}
        </View>
    );

    // render component
    return (
        <View style={styles.container}>
            {/* Search input */}
            <View style={searchStyles.searchContainer}>
                <TextInput
                    style={searchStyles.input}
                    placeholder="Search for food"
                    placeholderTextColor="#A390E4"
                    value={keyword}
                    onChangeText={setKeyword}
                />
                <TouchableOpacity style={searchStyles.button} onPress={handleSearchFood}>
                    <Text style={searchStyles.buttonText}>Search</Text>
                </TouchableOpacity>
            </View>
            {/* Display modal message */}
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
            {/* Search results */}
            {error ? <Text style={styles.subtitle}>{error}</Text> : null}
            {loading && <ActivityIndicator size="large" color={styles.title.color} />}
            <FlatList
                data={searchResults}
                keyExtractor={(item) => item.fdcId.toString()}
                renderItem={renderItem}
                onEndReached={handleLoadMoreResults}
                onEndReachedThreshold={0.1}
                ListFooterComponent={loading ? <ActivityIndicator size="small" color={styles.title.color} /> : null}
            />
            <BottomNavigation />
        </View>
    );
};

export default SearchScreen;