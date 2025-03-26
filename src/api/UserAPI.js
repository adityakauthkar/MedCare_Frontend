import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import {Alert} from 'react-native';

// Create an Axios instance with a base URL
const apiClient = axios.create({
  baseURL: 'http://192.168.234.33:4000/api',
  timeout: 10000, // You can adjust the timeout as needed
});
//http://10.0.2.2:4000
// Login User
// Login User
export const LoginUserAPI = async values => {
  try {
    const response = await apiClient.post('/user/login', values);
    console.log('Response from server:', response.data); // Log the full response

    // Check the 'success' field instead of 'status'
    if (response.data.success === 'ok') {
      const token = response.data.token; // Update to use 'token' from the response
      const userId = response.data._id;
      if (token) {
        await AsyncStorage.setItem('token', token); // Store the token
        Alert.alert('Logged in successfully');
        AsyncStorage.setItem('userId' , userId);
      } else {
        Alert.alert('Login failed', 'Token not received');
      }
      return response.data;
    } else {
      Alert.alert(
        'Login failed',
        response.data.message || 'Unknown error occurred',
      );
    }
  } catch (error) {
    console.error(
      'Error in LoginUserAPI:',
      error.response ? error.response.data : error.message,
    );
    Alert.alert(
      'Login Error',
      error.response?.data?.message || 'An error occurred',
    );
    throw error; // Re-throw the error to propagate it further
  }
};

// Register User
export const RegisterUserAPI = async values => {
  try {
    const response = await apiClient.post('/user/registerUser', values);
    if (response.data.status === 'ok') {
      Alert.alert('Registration successful', 'You can now log in');
      return response.data;
    } else {
      Alert.alert(
        'Registration failed',
        response.data.message || 'Unknown error occurred',
      );
    }
  } catch (error) {
    console.error('Error in RegisterUserAPI:', error.response || error.message);
    Alert.alert(
      'Registration Error',
      error.response?.data?.message || 'An error occurred',
    );
    throw error;
  }
};
