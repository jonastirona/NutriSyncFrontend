import { StyleSheet } from 'react-native';
import styles from '../styles/styles';

const percentageCircleStyles = StyleSheet.create({
    container: {
        alignItems: 'center',
        margin: 10,
    },
    label: {
        fontSize: 16,
        marginBottom: 5,
        color: styles.title.color,
    },
    circle: {
        width: 70,
        height: 70,
        borderRadius: 50,
        borderWidth: 5,
        borderColor: styles.button.backgroundColor,
        justifyContent: 'center',
        alignItems: 'center',
    },
    percentage: {
        fontSize: 16,
        color: styles.title.color,
    },
    valueText: {
        fontSize: 14,
        marginTop: 5,
        color: styles.title.color,
    },
});

export default percentageCircleStyles;