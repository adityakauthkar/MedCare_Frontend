/* eslint-disable prettier/prettier */
import React, { useEffect } from 'react'
import AuthStack from './AuthStack.js';
import { NavigationContainer } from '@react-navigation/native';
// import axios from 'axios';
// import constants from '../constants/index.js'

// const {BASE_URL}  = constants;

const RootNavigation = () => {
const setUrlConfig = () =>{
    console.log('called setUrlConfig');
    // axios.defaults.baseURL = BASE_URL;
};

useEffect(() => {
    setUrlConfig();
} , [] );

    return (
        <NavigationContainer>
            <AuthStack/>
        </NavigationContainer>

    );

};



export default RootNavigation; 