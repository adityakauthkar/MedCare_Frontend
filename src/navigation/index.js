/* eslint-disable prettier/prettier */
import React, { useEffect, useState } from 'react'
import AuthStack from './AuthStack.js';
import MainStack from './mainStack.js';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { NavigationContainer } from '@react-navigation/native';
// import axios from 'axios';
// import constants from '../constants/index.js'

// const {BASE_URL}  = constants;


const RootNavigation = () => {
    const setUrlConfig = () => {
        console.log('called setUrlConfig');
        // axios.defaults.baseURL = BASE_URL;
    };

    useEffect(() => {
        setUrlConfig();
    }, []);


    const [userToken, setUserToken] = useState(null);
    useEffect(() => {
        const checkLoginStatus = async () => {
            try {
                const token = await AsyncStorage.getItem('token');
                if (token) {
                    setUserToken(token);
                }
            } catch (error) {
                console.error('Error fetching token:', error);
            }
        };
        checkLoginStatus();
    })


    return (
        <NavigationContainer>
         {userToken? <MainStack/> : <AuthStack/>}
        </NavigationContainer>

    );

};



export default RootNavigation; 