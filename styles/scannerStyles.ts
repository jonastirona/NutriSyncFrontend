import { StyleSheet } from 'react-native';

const scannerStyles = StyleSheet.create({
    camera: {
        flex: 1,
    },
    topContent: {
        flex: 0.1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    bottomContent: {
        flex: 0.1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    circleValueContainer: {
        alignItems: 'center',
        marginBottom: 10,
    },
    smallerCircle: {
        width: 50,
        height: 50,
        borderRadius: 50,
        borderWidth: 5,
    },
    smallerCircleText: {
        fontSize: 16,
    },
});

export default scannerStyles;