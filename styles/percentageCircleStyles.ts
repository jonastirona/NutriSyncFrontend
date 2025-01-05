import { StyleSheet } from 'react-native';

const percentageCircleStyles = StyleSheet.create({
    container: {
        alignItems: 'center',
        margin: 10,
    },
    label: {
        fontSize: 16,
        marginBottom: 5,
        color: '#D4A5FF',
    },
    svgContainer: {
        position: 'relative',
        justifyContent: 'center',
        alignItems: 'center',
    },
    percentageText: {
        position: 'absolute',
        fontSize: 14,
        color: '#A390E4',
    },
    valueText: {
        fontSize: 14,
        marginTop: 5,
        color: '#A390E4',
    },
});

export default percentageCircleStyles;