import { StyleSheet } from 'react-native';

const foodLogStyles = StyleSheet.create({
  container: {
    margin: 10,
    backgroundColor: '#ffedf5', // White
    borderRadius: 10,
    padding: 10,
  },
  title: {
    fontSize: 18,
    marginBottom: 10,
    color: '#709afc', // Light Blue
    textAlign: 'center',
  },
  scrollContainer: {
    maxHeight: 200,
  },
  foodItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 5,
    padding: 10,
    backgroundColor: '#18183C', // Deep Blue
    borderRadius: 5,
  },
  foodName: {
    fontSize: 16,
    color: '#b048fa', // Purple
  },
  foodCalories: {
    fontSize: 16,
    color: '#709afc', // Light Blue
  },
});

export default foodLogStyles;