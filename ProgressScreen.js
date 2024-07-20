import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import { auth, db } from "../firebase";
import { doc, getDoc } from "firebase/firestore";
import globalStyles from "../styles/globalStyles";

export default function ProgressScreen() {
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
        Text style = { globalStyles.title } > Your Progress < /Text> {
            userProgress && ( <
                View >
                <
                Text style = { styles.progressText } > Level: { userProgress.level } < /Text> <
                Text style = { styles.progressText } > XP: { userProgress.xp } < /Text> { /* Add more progress information here */ } <
                /View>
            )
        } <
        /View>
    );
}

const styles = StyleSheet.create({
    progressText: {
        fontSize: 18,
        marginBottom: 10,
    },
});