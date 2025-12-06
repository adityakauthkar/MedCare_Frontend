import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, TextInput, StyleSheet, Button } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import ShowReminder from './ShowReminder';
import { useNavigation } from '@react-navigation/native';
import messaging from '@react-native-firebase/messaging';


const ReminderScreen = () => {
  const navigation = useNavigation();

  useEffect(() => {
    getDeviceToken();
  }, []);

  const getDeviceToken = async () => {
    let token = await messaging().getToken();
    console.log(token);
  }


  const [userId, setUserId] = useState('');
  const [medicineId, setMedicineId] = useState('');
  const [dosage, setDosage] = useState('');
  const [times, setTimes] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');

  // Fetch userId from AsyncStorage on component mount
  useEffect(() => {
    const fetchUserId = async () => {
      try {
        const storedUserId = await AsyncStorage.getItem('userId');
        if (storedUserId !== null) {
          setUserId(storedUserId);
        } else {
          console.log("UserId not found");
        }
      } catch (e) {
        console.error("Failed to load userId", e);
      }
    };
    fetchUserId();
  }, []);

  const PostDate = async () => {
    const url = 'http://192.168.234.33:4000/api/reminder/reminder';
    let result = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        userId,
        medicineId,
        dosage,
        times,
        startDate,
        endDate
      }),
    });
    console.log(result);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Set Medicine Reminder</Text>

      {/* Hide the userId input since it's now fetched automatically */}
      <TextInput
        style={styles.input}
        placeholder="Enter medicine id"
        onChangeText={setMedicineId}
        value={medicineId}
      />

      <TextInput
        style={styles.input}
        placeholder="Enter dosage"
        onChangeText={setDosage}
        value={dosage}
      />

      <TextInput
        style={styles.input}
        placeholder="Enter time to take medicine"
        onChangeText={setTimes}
        value={times}
      />

      <TextInput
        style={styles.input}
        placeholder="Enter start date (YYYY-MM-DD)"
        onChangeText={setStartDate}
        value={startDate}
      />

      <TextInput
        style={styles.input}
        placeholder="Enter end date (YYYY-MM-DD)"
        onChangeText={setEndDate}
        value={endDate}
      />

      <TouchableOpacity style={styles.button} onPress={PostDate}>
        <Text style={styles.buttonText}>Set Reminder</Text>
      </TouchableOpacity>

      <Button title='Show Reminders' onPress={() => navigation.navigate('ShowReminder')} />


      <Button title='getNotification' />
    </View>
  );
};

export default ReminderScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f8f8f8',
  },
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  input: {
    height: 50,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 10,
    marginBottom: 15,
    backgroundColor: '#fff',
  },
  button: {
    backgroundColor: "#ADD8E6",
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 10,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});
