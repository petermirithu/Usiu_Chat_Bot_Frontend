import { StyleSheet } from 'react-native';
import { Dimensions } from 'react-native';

export const screenWidth = Dimensions.get("screen").width;
export const screenHeight = Dimensions.get('screen').height;

export const Global = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff"
    },
    title: {
        fontFamily: "Poppins-Bold",
        fontSize: 30,
        lineHeight: 35
    },
    input: {
        height: 50,
        borderWidth: 1,
        padding: 10,
        borderRadius: 100,
        backgroundColor: "#fff"
    },
    inputLabel: {
        fontFamily: "Poppins-SemiBold",
        marginBottom: 3,
    },
    backgroundImage: {
        flex: 1,
        width: '100%',
        height: '100%',
    },
    shadowEffect: {
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.18,
        shadowRadius: 1.00,
        elevation: 1,
    },
});