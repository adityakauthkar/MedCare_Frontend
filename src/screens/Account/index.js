import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { FlatList } from 'react-native-gesture-handler';

const Account = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetchGetProfileAPI();
  }, []);

  const fetchGetProfileAPI = async () => {
    try {
      const url = "http://192.168.234.33:4000/api/user/profile";
      const token = await AsyncStorage.getItem('token');
      if (!token) {
        throw new Error("No token found, user might not be logged in.");
      }

      const response = await axios.get(url, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      console.log(response.data); // Check the response structure
      setData(response.data); 
    } catch (error) {
      console.error('Error fetching user profile API:', error);
    }
  };

  const renderItem = ({ item }) => (
    <View style={styles.itemContainer}>
      <Text>{item.name || 'No Name'}</Text> {/* Fallback if name is undefined */}
    </View>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={data}
        renderItem={renderItem}
        keyExtractor={item => item._id.toString()} // Ensure _id is a string
      />
      
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  itemContainer: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
});

export default Account;
