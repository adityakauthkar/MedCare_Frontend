import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, Button, Alert } from 'react-native';
import axios from 'axios';

const ReminderScreen = () => {
    const [medicineId, setMedicineId] = useState('668793740c551ba08b44c606');
    const [userId, setUserId] = useState('669e00e941d09faacf5a7c4d');
    const [frequency, setFrequency] = useState('daily');
    const [time, setTime] = useState('08:00, 20:00');
    const [startdate, setStartdate] = useState('2023-07-01');
    const [endDate, setEndDate] = useState('2023-07-29');
    const [dosage, setDosage] = useState('2 pills');

    const handlePostRequest = async () => {
        const url = 'http://192.168.1.204:4000/api/reminder/reminder'; // Ensure this is the correct endpoint
        const data = {
            medicineId: medicineId,
            userId: userId,
            frequency: frequency,
            time: time.split(',').map(t => t.trim()), // Convert time string to array
            startDate: startdate,
            endDate: endDate,
            dosage: dosage,
        };

        try {
            const response = await axios.post(url, data, {
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            Alert.alert('Success', 'Data submitted successfully!', [
                { text: 'OK' },
            ]);
            console.log(response.data);
        } catch (error) {
            Alert.alert('Error', 'Something went wrong!', [
                { text: 'OK' },
            ]);
            console.error('Error:', error);
        }
    };

    return (
        <View style={styles.container}>
            <TextInput
                placeholder='Enter medicine id'
                style={styles.inputBox}
                value={medicineId}
                onChangeText={setMedicineId}
            />
            <TextInput
                placeholder='Enter user id'
                style={styles.inputBox}
                value={userId}
                onChangeText={setUserId}
            />
            <TextInput
                placeholder='Enter frequency'
                style={styles.inputBox}
                value={frequency}
                onChangeText={setFrequency}
            />
            <TextInput
                placeholder='Enter time (comma-separated)'
                style={styles.inputBox}
                value={time}
                onChangeText={setTime}
            />
            <TextInput
                placeholder='Enter start date'
                style={styles.inputBox}
                value={startdate}
                onChangeText={setStartdate}
            />
            <TextInput
                placeholder='Enter end date'
                style={styles.inputBox}
                value={endDate}
                onChangeText={setEndDate}
            />
            <TextInput
                placeholder='Enter dosage'
                style={styles.inputBox}
                value={dosage}
                onChangeText={setDosage}
            />
            <Button title="Save Reminder" onPress={handlePostRequest} />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        padding: 16,
    },
    inputBox: {
        borderColor: 'black',
        borderWidth: 1,
        borderRadius: 8,
        padding: 10,
        marginBottom: 16,
    },
});

export default ReminderScreen;
