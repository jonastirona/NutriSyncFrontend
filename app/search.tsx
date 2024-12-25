import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, FlatList, StyleSheet } from 'react-native';
import { BottomNavigation } from '../components/bottomNavigation';
import PercentageCircle from '../components/percentageCircle';
import styles from '../styles';

interface FoodNutrient {
  nutrientName: string;
  value: number;
}

interface FoodItem {
  fdcId: number;
  description: string;
  foodNutrients: FoodNutrient[];
}

export default function Search() {
  const [keyword, setKeyword] = useState('');
  const [results, setResults] = useState<FoodItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [expandedItemId, setExpandedItemId] = useState<number | null>(null);

  useEffect(() => {
    // Fetch initial list of foods on component mount
    handleSearch();
  }, []);

  const handleSearch = async () => {
    setLoading(true);
    try {
      const response = await fetch(`http://nutrisyncbackend-env.eba-2wtn6ifs.us-east-2.elasticbeanstalk.com/lookup?keyword=${keyword}&pageNum=1&size=10`);
      const data = await response.json();
      setResults(data.foods || []);
    } catch (error) {
      console.error('Error fetching food data:', error);
    } finally {
      setLoading(false);
    }
  };

  const toggleExpand = (id: number) => {
    setExpandedItemId(expandedItemId === id ? null : id);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Search</Text>
      <Text style={styles.subtitle}>Search for food information here.</Text>
      <TextInput
        style={localStyles.input}
        placeholder="Enter food keyword"
        value={keyword}
        onChangeText={setKeyword}
      />
      <TouchableOpacity style={localStyles.button} onPress={handleSearch}>
        <Text style={localStyles.buttonText}>Search</Text>
      </TouchableOpacity>
      {loading ? (
        <Text>Loading...</Text>
      ) : (
        <FlatList
          data={results}
          keyExtractor={(item) => item.fdcId.toString()}
          renderItem={({ item }) => (
            <View>
              <TouchableOpacity onPress={() => toggleExpand(item.fdcId)} style={localStyles.resultItem}>
                <Text style={localStyles.resultText}>{item.description}</Text>
              </TouchableOpacity>
              {expandedItemId === item.fdcId && (
                <View style={localStyles.dropdown}>
                  <View style={localStyles.percentageContainer}>
                    <PercentageCircle
                      label="Fat"
                      percentage={item.foodNutrients.find(n => n.nutrientName === 'Total lipid (fat)')?.value || 0}
                    />
                    <PercentageCircle
                      label="Carbs"
                      percentage={item.foodNutrients.find(n => n.nutrientName === 'Carbohydrate, by difference')?.value || 0}
                    />
                    <PercentageCircle
                      label="Protein"
                      percentage={item.foodNutrients.find(n => n.nutrientName === 'Protein')?.value || 0}
                    />
                  </View>
                </View>
              )}
            </View>
          )}
        />
      )}
      <BottomNavigation />
    </View>
  );
}

const localStyles = StyleSheet.create({
  input: {
    height: 40,
    borderColor: '#A390E4',
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
    color: '#D4A5FF',
  },
  button: {
    backgroundColor: '#A390E4',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    alignItems: 'center',
    marginBottom: 20,
  },
  buttonText: {
    color: '#1A1A2E',
    fontWeight: 'bold',
  },
  resultItem: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#D4A5FF',
  },
  resultText: {
    color: '#D4A5FF',
  },
  dropdown: {
    padding: 10,
    backgroundColor: '#1A1A2E',
    borderBottomWidth: 1,
    borderBottomColor: '#D4A5FF',
  },
  percentageContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
});