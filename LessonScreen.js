import React, { useState, useEffect } from "react";
import { View, Text, FlatList, TouchableOpacity } from "react-native";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase";
import globalStyles from "../styles/globalStyles";

export default function LessonScreen({ navigation }) {
    const [lessons, setLessons] = useState([]);

    useEffect(() => {
        const fetchLessons = async() => {
            const querySnapshot = await getDocs(collection(db, "lessons"));
            setLessons(
                querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }))
            );
        };

        fetchLessons();
    }, []);

    const renderLesson = ({ item }) => ( <
        TouchableOpacity style = { styles.lessonItem }
        onPress = {
            () => navigation.navigate("Quiz", { lessonId: item.id }) } >
        <
        Text style = { styles.lessonTitle } > { item.title } < /Text> <
        Text > { item.description } < /Text> <
        /TouchableOpacity>
    );

    return ( <
        View style = { globalStyles.container } >
        <
        Text style = { globalStyles.title } > Lessons < /Text> <
        FlatList data = { lessons }
        renderItem = { renderLesson }
        keyExtractor = {
            (item) => item.id }
        /> <
        /View>
    );
}

const styles = StyleSheet.create({
    lessonItem: {
        backgroundColor: "#f0f0f0",
        padding: 15,
        marginBottom: 10,
        borderRadius: 5,
    },
    lessonTitle: {
        fontSize: 18,
        fontWeight: "bold",
    },
});