import React from "react";
import { TouchableOpacity, Text, StyleSheet } from "react-native";

const CustomButton = ({ title, onPress, style }) => ( <
    TouchableOpacity style = {
        [styles.button, style] }
    onPress = { onPress } >
    <
    Text style = { styles.buttonText } > { title } < /Text> <
    /TouchableOpacity>
);

const styles = StyleSheet.create({
    button: {
        backgroundColor: "#007AFF",
        padding: 10,
        borderRadius: 5,
        alignItems: "center",
    },
    buttonText: {
        color: "white",
        fontSize: 18,
    },
});

export default CustomButton;