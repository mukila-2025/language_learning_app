import React, { useState, useEffect } from "react";
import { View, Text, FlatList, TextInput, StyleSheet } from "react-native";
import { auth, db } from "../firebase";
import {
    collection,
    addDoc,
    query,
    orderBy,
    onSnapshot,
} from "firebase/firestore";
import globalStyles from "../styles/globalStyles";
import CustomButton from "../components/CustomButton";

export default function ForumScreen() {
    const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState("");

    useEffect(() => {
        const messagesRef = collection(db, "forumMessages");
        const q = query(messagesRef, orderBy("createdAt", "desc"));

        const unsubscribe = onSnapshot(q, (querySnapshot) => {
            const messageList = querySnapshot.docs.map((doc) => ({
                id: doc.id,
                ...doc.data(),
            }));
            setMessages(messageList);
        });

        return unsubscribe;
    }, []);

    const handleSendMessage = async() => {
        if (newMessage.trim() === "") return;

        const user = auth.currentUser;
        if (user) {
            await addDoc(collection(db, "forumMessages"), {
                text: newMessage,
                createdAt: new Date(),
                userId: user.uid,
                userName: user.displayName || user.email,
            });
            setNewMessage("");
        }
    };

    const renderMessage = ({ item }) => ( <
        View style = { styles.messageItem } >
        <
        Text style = { styles.messageUser } > { item.userName } < /Text> <
        Text > { item.text } < /Text> <
        /View>
    );

    return ( <
        View style = { globalStyles.container } >
        <
        Text style = { globalStyles.title } > Community Forum < /Text> <
        FlatList data = { messages }
        renderItem = { renderMessage }
        keyExtractor = {
            (item) => item.id }
        style = { styles.messageList }
        /> <
        View style = { styles.inputContainer } >
        <
        TextInput style = { styles.input }
        value = { newMessage }
        onChangeText = { setNewMessage }
        placeholder = "Type a message..." /
        >
        <
        CustomButton title = "Send"
        onPress = { handleSendMessage }
        /> <
        /View> <
        /View>
    );
}

const styles = StyleSheet.create({
    messageList: {
        flex: 1,
    },
    messageItem: {
        backgroundColor: "#f0f0f0",
        padding: 10,
        marginBottom: 5,
        borderRadius: 5,
    },
    messageUser: {
        fontWeight: "bold",
        marginBottom: 5,
    },
    inputContainer: {
        flexDirection: "row",
        alignItems: "center",
    },
    input: {
        flex: 1,
        borderWidth: 1,
        borderColor: "#ddd",
        padding: 10,
        marginRight: 10,
        borderRadius: 5,
    },
});