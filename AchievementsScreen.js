import React, { useEffect, useState } from "react";
import { View, Text, FlatList, StyleSheet } from "react-native";
import { auth, db } from "../firebase";
import { collection, query, where, getDocs } from "firebase/firestore";
import globalStyles from "../styles/globalStyles";

export default function AchievementsScreen() {
    const [achievements, setAchievements] = useState([]);

    useEffect(() => {
        const fetchAchievements = async() => {
            const user = auth.currentUser;
            if (user) {
                const achievementsRef = collection(db, "achievements");
                const q = query(achievementsRef, where("userId", "==", user.uid));
                const querySnapshot = await getDocs(q);
                setAchievements(
                    querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }))
                );
            }
        };

        fetchAchievements();
    }, []);

    const renderAchievement = ({ item }) => ( <
        View style = { styles.achievementItem } >
        <
        Text style = { styles.achievementTitle } > { item.title } < /Text> <
        Text > { item.description } < /Text> <
        /View>
    );

    return ( <
        View style = { globalStyles.container } >
        <
        Text style = { globalStyles.title } > Achievements < /Text> <
        FlatList data = { achievements }
        renderItem = { renderAchievement }
        keyExtractor = {
            (item) => item.id }
        /> <
        /View>
    );
}

const styles = StyleSheet.create({
    achievementItem: {
        backgroundColor: "#f0f0f0",
        padding: 15,
        marginBottom: 10,
        borderRadius: 5,
    },
    achievementTitle: {
        fontSize: 18,
        fontWeight: "bold",
        marginBottom: 5,
    },
});