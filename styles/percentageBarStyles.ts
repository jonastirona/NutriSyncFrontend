import { StyleSheet } from 'react-native';

const percentageBarStyles = StyleSheet.create({
    container: {
        margin: 10,
    },
    label: {
        fontSize: 16,
        color: '#D4A5FF',
        marginBottom: 5,
    },
    barContainer: {
        height: 20,
        backgroundColor: '#2D2D44',
        borderRadius: 10,
        overflow: 'hidden',
    },
    bar: {
        height: '100%',
        backgroundColor: '#76c7c0',
    },
    bottomContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 5,
    },
    percentage: {
        fontSize: 14,
        color: '#A390E4',
    },
    valueText: {
        fontSize: 14,
        color: '#A390E4',
    },
});

export default percentageBarStyles;