import { StyleSheet } from 'react-native';
import { Colors } from '../constants/colors';

const BUTTON_HEIGHT = 48;
const BUTTON_RADIUS = 8;

export const buttonStyles = StyleSheet.create({
    container: {
        height: BUTTON_HEIGHT,
        borderRadius: BUTTON_RADIUS,
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 16,
        width: '100%',
        backgroundColor: Colors.dark.background,
    },
    text: {
        color: '#fff',
        fontSize: 16,
        fontWeight: '600',
        letterSpacing: 0.5,
    },
    disabled: {
        backgroundColor: '#a1a1aa',
    },
    outline: {
        backgroundColor: 'transparent',
        borderWidth: 1,
        borderColor: '#2563eb',
    },
    outlineText: {
        color: '#2563eb',
    },
});