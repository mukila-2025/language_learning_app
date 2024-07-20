import React, { useEffect, useState } from "react";
import { View, Text } from "react-native";
import { auth, db } from "../firebase";
import { doc, getDoc } from "firebase/firestore";
import globalStyles from "../styles/globalStyles";
import CustomButton from "../components/CustomButton";

export default function HomeScreen({ navigation }) {
    const [userProgress, setUserProgress] = useState(null);

    useEffect(() => {
        const fetchUserProgress = async() => {
            const user = auth.currentUser;
            if (user) {
                const docRef = doc(db, "userProgress", user.uid);
                const docSnap = await getDoc(docRef);
                if (docSnap.exists()) {
                    setUserProgress(docSnap.data());
                }
            }
        };

        fetchUserProgress();
    }, []);

    return ( <
        View style = { globalStyles.container } >
        <
        Text style = { globalStyles.title } > Welcome to LinguaQuest! < /Text> {
            userProgress && ( <
                View >
                <
                Text > Level: { userProgress.level } < /Text> <
                Text > XP: { userProgress.xp } < /Text> <
                /View>
            )
        } <
        CustomButton title = "Start Learning"
        onPress = {
            () => navigation.navigate("Lessons") }
        style = {
            { marginTop: 20 } }
        /> <
        /View>
    );
}