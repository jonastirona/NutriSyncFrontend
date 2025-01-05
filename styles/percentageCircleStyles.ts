import { StyleSheet } from 'react-native';

const percentageCircleStyles = StyleSheet.create({
    container: {
        alignItems: 'center',
        margin: 10,
    },
    label: {
        fontSize: 16,
        marginBottom: 5,
        color: '#709afc', // Light Blue
    },
    svgContainer: {
        position: 'relative',
        justifyContent: 'center',
        alignItems: 'center',
    },
    percentageText: {
        position: 'absolute',
        fontSize: 14,
        color: '#b048fa', // Purple
    },
    valueText: {
        fontSize: 14,
        marginTop: 5,
        color: '#b048fa', // Purple
    },
});

export default percentageCircleStyles;