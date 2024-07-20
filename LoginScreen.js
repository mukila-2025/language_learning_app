import React, { useState } from "react";
import { View, Text, TextInput, Alert } from "react-native";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";
import globalStyles from "../styles/globalStyles";
import CustomButton from "../components/CustomButton";

export default function LoginScreen({ navigation }) {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleLogin = async() => {
        try {
            await signInWithEmailAndPassword(auth, email, password);
        } catch (error) {
            Alert.alert("Login Error", error.message);
        }
    };

    return ( <
        View style = { globalStyles.container } >
        <
        Text style = { globalStyles.title } > Login < /Text> <
        TextInput style = { globalStyles.input }
        placeholder = "Email"
        value = { email }
        onChangeText = { setEmail }
        keyboardType = "email-address"
        autoCapitalize = "none" /
        >
        <
        TextInput style = { globalStyles.input }
        placeholder = "Password"
        value = { password }
        onChangeText = { setPassword }
        secureTextEntry /
        >
        <
        CustomButton title = "Login"
        onPress = { handleLogin }
        /> <
        CustomButton title = "Register"
        onPress = {
            () => navigation.navigate("Register") }
        style = {
            { marginTop: 10, backgroundColor: "#4CAF50" } }
        /> <
        /View>
    );
}