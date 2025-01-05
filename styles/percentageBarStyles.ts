import { StyleSheet } from 'react-native';

const percentageBarStyles = StyleSheet.create({
    container: {
        margin: 10,
    },
    label: {
        fontSize: 16,
        color: '#709afc', // Light Blue
        marginBottom: 5,
    },
    barContainer: {
        height: 20,
        backgroundColor: '#fcfcfc', // White
        borderRadius: 10,
        overflow: 'hidden',
    },
    bar: {
        height: '100%',
        backgroundColor: '#d11ffa', // Bright Pink
    },
    bottomContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 5,
    },
    percentage: {
        fontSize: 14,
        color: '#b048fa', // Purple
    },
    valueText: {
        fontSize: 14,
        color: '#b048fa', // Purple
    },
});

export default percentageBarStyles;