import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, FlatList, StyleSheet } from 'react-native';

const DiseaseScreen = () => {
    const [symptomInput, setSymptomInput] = useState('');
    const [messages, setMessages] = useState([]);

    const detectDisease = () => {
        if (symptomInput.trim()) {
            //API CALL HERE : 
            const simulatedResponse = `Based on your symptoms, it might be a common cold. Please consult a doctor for confirmation.`;
            
            setMessages(prevMessages => [
                ...prevMessages,
                { type: 'user', text: symptomInput },
                { type: 'response', text: simulatedResponse }
            ]);

            setSymptomInput(''); // Clear input after sending
        }
    };

    const renderMessage = ({ item }) => (
        <View style={[styles.messageContainer, item.type === 'user' ? styles.userMessage : styles.responseMessage]}>
            <Text style={styles.messageText}>{item.text}</Text>
        </View>
    );

    return (
        <View style={styles.container}>
            <FlatList
                data={messages}
                renderItem={renderMessage}
                keyExtractor={(item, index) => index.toString()}
                style={styles.chatContainer}
                inverted
            />
            <View style={styles.inputContainer}>
                <TextInput
                    style={styles.input}
                    placeholder="Enter your symptoms..."
                    value={symptomInput}
                    onChangeText={setSymptomInput}
                />
                <TouchableOpacity style={styles.button} onPress={detectDisease}>
                    <Text style={styles.buttonText}>Detect</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#ADD8E6',
        padding: 10,
    },
    chatContainer: {
        flex: 1,
        marginBottom: 10,
    },
    inputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    input: {
        flex: 1,
        height: 50,
        paddingHorizontal: 15,
        borderColor: '#ccc',
        borderWidth: 1,
        borderRadius: 25,
        backgroundColor: '#fff',
        marginRight: 10,
    },
    button: {
        backgroundColor: '#0033A0',
        paddingHorizontal: 20,
        paddingVertical: 10,
        borderRadius: 25,
    },
    buttonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
    },
    messageContainer: {
        maxWidth: '80%',
        padding: 10,
        borderRadius: 10,
        marginVertical: 5,
    },
    userMessage: {
        alignSelf: 'flex-end',
        backgroundColor: '#007bff',
        borderRadius: 15,
    },
    responseMessage: {
        alignSelf: 'flex-start',
        backgroundColor: '#e2e2e2',
        borderRadius: 15,
    },
    messageText: {
        color: '#fff',
        fontSize: 15,
    },
});

export default DiseaseScreen;
