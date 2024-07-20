import React, { useState, useEffect } from "react";
import { View, Text, TextInput } from "react-native";
import { doc, updateDoc, increment } from "firebase/firestore";
import { auth, db } from "../firebase";
import globalStyles from "../styles/globalStyles";
import CustomButton from "../components/CustomButton";

const words = ["apple", "banana", "cherry", "date", "elderberry"];

export default function GameScreen() {
    const [currentWord, setCurrentWord] = useState("");
    const [scrambledWord, setScrambledWord] = useState("");
    const [userInput, setUserInput] = useState("");
    const [score, setScore] = useState(0);

    useEffect(() => {
        startNewRound();
    }, []);

    const startNewRound = () => {
        const newWord = words[Math.floor(Math.random() * words.length)];
        setCurrentWord(newWord);
        setScrambledWord(scrambleWord(newWord));
        setUserInput("");
    };

    const scrambleWord = (word) => {
        return word
            .split("")
            .sort(() => Math.random() - 0.5)
            .join("");
    };

    const handleGuess = async() => {
        if (userInput.toLowerCase() === currentWord) {
            setScore(score + 1);
            const user = auth.currentUser;
            if (user) {
                const userProgressRef = doc(db, "userProgress", user.uid);
                await updateDoc(userProgressRef, {
                    xp: increment(10),
                });
            }
        }
        startNewRound();
    };

    return ( <
        View style = { globalStyles.container } >
        <
        Text style = { globalStyles.title } > Word Scramble < /Text> <
        Text style = { styles.scrambledWord } > { scrambledWord } < /Text> <
        TextInput style = { globalStyles.input }
        value = { userInput }
        onChangeText = { setUserInput }
        placeholder = "Enter your guess" /
        >
        <
        CustomButton title = "Submit Guess"
        onPress = { handleGuess }
        /> <
        Text style = { styles.scoreText } > Score: { score } < /Text> <
        /View>
    );
}

const styles = StyleSheet.create({
    scrambledWord: {
        fontSize: 24,
        marginBottom: 20,
    },
    scoreText: {
        fontSize: 18,
        marginTop: 20,
    },
});