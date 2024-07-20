import React, { useState } from "react";
import { View, Text, TextInput, Alert } from "react-native";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth, db } from "../firebase";
import { doc, setDoc } from "firebase/firestore";
import globalStyles from "../styles/globalStyles";
import CustomButton from "../components/CustomButton";

export default function RegisterScreen() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleRegister = async() => {
        try {
            const userCredential = await createUserWithEmailAndPassword(
                auth,
                email,
                password
            );
            await setDoc(doc(db, "userProgress", userCredential.user.uid), {
                level: 1,
                xp: 0,
            });
        } catch (error) {
            Alert.alert("Registration Error", error.message);
        }
    };

    return ( <
        View style = { globalStyles.container } >
        <
        Text style = { globalStyles.title } > Register < /Text> <
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
        CustomButton title = "Register"
        onPress = { handleRegister }
        /> <
        /View>
    );
}