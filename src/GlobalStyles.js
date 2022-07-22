import { StyleSheet, Platform, Dimensions } from 'react-native';

const { height, width } = Dimensions.get("screen");

export default StyleSheet.create({
    androidSafeArea: {
        flex: 1,
        paddingTop: Platform.OS === 'android' ? 35 : 0
    },
    background: {
        position: "absolute",
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
        height: height > width ? height : width,
    },
});