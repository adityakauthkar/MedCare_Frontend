import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import Tabs from './tabs';
import Account from '../screens/Account';
import Reminders from '../screens/Reminders';
import Home from '../screens/Home';
import PharmacyMaps from '../screens/PharmacyMaps';
import OnboardingScreen from '../onboarding';
import SearchScreen from '../screens/searchScreen';
import Register from '../screens/Register';
import Login from '../screens/Login/indes';
const Stack = createStackNavigator();

const AuthStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{headerShown: false}}
      initialRouteName="Register">

      <Stack.Screen name="Home" component={Tabs} />
      <Stack.Screen name="Maps" component={PharmacyMaps} />
      <Stack.Screen name="Reminders" component={Reminders} />
      <Stack.Screen name="Account" component={Account} />
      <Stack.Screen name="Onboarding" component={OnboardingScreen} />
      <Stack.Screen name="SearchScreen" component={SearchScreen} />
      <Stack.Screen name="Register" component={Register} />
      <Stack.Screen name="Login" component={Login}/>

    </Stack.Navigator>
  );
};

export default AuthStack;
