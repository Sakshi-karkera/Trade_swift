import { View, Text } from 'react-native';
import React, { useEffect, useState } from 'react';
import { useLocalSearchParams, useNavigation } from 'expo-router';
import { addDoc, collection, doc, getDoc, onSnapshot, serverTimestamp } from 'firebase/firestore'; // Import serverTimestamp
import { db } from '../../config/FirebaseConfig';
import { useUser } from '@clerk/clerk-expo';
import { GiftedChat } from 'react-native-gifted-chat';
import 'react-native-get-random-values';

export default function ChatScreen() {
    const params = useLocalSearchParams();
    const navigation = useNavigation();
    const { user } = useUser();
    const [messages, setMessages] = useState([]);

    useEffect(() => {
        GetUserDetails();

        const unsubscribe = onSnapshot(collection(db, 'Chat', params?.id, 'Messages'), (snapshot) => {
            const messageData = snapshot.docs.map((doc) => ({
                id: doc.id,
                ...doc.data(),
                createdAt: doc.data().createdAt?.toDate() || new Date() // Ensure createdAt is a JS date
            }));
            setMessages(messageData.sort((a, b) => b.createdAt - a.createdAt)); // Sort messages by time
        });

        return () => unsubscribe();
    }, []);

    const GetUserDetails = async () => {
        const docRef = doc(db, 'Chat', params?.id);
        const docSnap = await getDoc(docRef);

        const result = docSnap.data();
        console.log(result);
        const otherUser = result?.users.filter(item => item.email != user?.primaryEmailAddress?.emailAddress);
        console.log(otherUser);
        navigation.setOptions({
            headerTitle: otherUser[0]?.name || 'Chat'
        });
    };

    const onSend = async (newMessage = []) => {
        const messageWithTimestamp = {
            ...newMessage[0],
            createdAt: serverTimestamp(), // Add Firebase server timestamp for accurate time
        };

        // Append the message locally
        setMessages((previousMessages) => GiftedChat.append(previousMessages, messageWithTimestamp));

        // Save the message to Firestore with the timestamp
        await addDoc(collection(db, 'Chat', params.id, 'Messages'), messageWithTimestamp);
    };

    return (
        <GiftedChat
            messages={messages}
            onSend={(messages) => onSend(messages)}
            showUserAvatar={true}
            user={{
                _id: user?.primaryEmailAddress?.emailAddress,
                name: user?.fullName,
                avatar: user?.imageUrl,
            }}
        />
    );
}
