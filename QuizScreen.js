import React, { useState, useEffect } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import {
    collection,
    getDocs,
    doc,
    updateDoc,
    increment,
} from "firebase/firestore";
import { auth, db } from "../firebase";
import globalStyles from "../styles/globalStyles";

export default function QuizScreen({ route, navigation }) {
    const { lessonId } = route.params;
    const [questions, setQuestions] = useState([]);
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [score, setScore] = useState(0);

    useEffect(() => {
        const fetchQuestions = async() => {
            const querySnapshot = await getDocs(
                collection(db, "lessons", lessonId, "questions")
            );
            setQuestions(
                querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }))
            );
        };

        fetchQuestions();
    }, [lessonId]);

    const handleAnswer = async(isCorrect) => {
        if (isCorrect) {
            setScore(score + 1);
        }

        if (currentQuestionIndex < questions.length - 1) {
            setCurrentQuestionIndex(currentQuestionIndex + 1);
        } else {
            // Quiz completed
            const user = auth.currentUser;
            if (user) {
                const userProgressRef = doc(db, "userProgress", user.uid);
                await updateDoc(userProgressRef, {
                    xp: increment(score * 10),
                });
            }
            navigation.navigate("QuizResult", { score, total: questions.length });
        }
    };

    if (questions.length === 0) {
        return <Text > Loading... < /Text>;
    }

    const currentQuestion = questions[currentQuestionIndex];

    return ( <
        View style = { globalStyles.container } >
        <
        Text style = { globalStyles.title } > { currentQuestion.text } < /Text> {
            currentQuestion.options.map((option, index) => ( <
                TouchableOpacity key = { index }
                style = { styles.optionButton }
                onPress = {
                    () => handleAnswer(option.isCorrect) } >
                <
                Text style = { styles.optionText } > { option.text } < /Text> <
                /TouchableOpacity>
            ))
        } <
        /View>
    );
}

const styles = StyleSheet.create({
    optionButton: {
        backgroundColor: "#007AFF",
        padding: 10,
        marginBottom: 10,
        borderRadius: 5,
    },
    optionText: {
        color: "white",
        fontSize: 16,
    },
});