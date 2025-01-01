import { StyleSheet } from 'react-native';

const foodLogStyles = StyleSheet.create({
  container: {
    margin: 10,
    backgroundColor: '#2D2D44',
    borderRadius: 10,
    padding: 10,
  },
  title: {
    fontSize: 18,
    marginBottom: 10,
    color: '#D4A5FF',
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
    backgroundColor: '#1A1A2E',
    borderRadius: 5,
  },
  foodName: {
    fontSize: 16,
    color: '#A390E4',
  },
  foodCalories: {
    fontSize: 16,
    color: '#76c7c0',
  },
});

export default foodLogStyles;