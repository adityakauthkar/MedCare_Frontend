/* eslint-disable prettier/prettier */
import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Home from '../screens/Home';
import Account from '../screens/Account';
import Reminders from '../screens/Reminders';
import PharmacyMaps from '../screens/PharmacyMaps';
import Icon from 'react-native-vector-icons/Ionicons';

const Tab = createBottomTabNavigator();

const Tabs = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ size, color }) => {
          let iconName;

          if (route.name === 'Home') {
            iconName = 'home-sharp';
          } else if (route.name === 'Maps') {
            iconName = 'map';
          } else if (route.name === 'Reminders') {
            iconName = 'notifications';
          } else if (route.name === 'Account') {
            iconName = 'person';
          }

          return <Icon name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: '#F0F8FF',
        tabBarInactiveTintColor: '#0033A0',
        tabBarStyle: {
          backgroundColor: '#ADD8E6',
         
        },
        headerShown: false,
      })}
    >
      <Tab.Screen name="Home" component={Home} />
      <Tab.Screen name="Maps" component={PharmacyMaps} />
      <Tab.Screen name="Reminders" component={Reminders} />
      <Tab.Screen name="Account" component={Account} />
    </Tab.Navigator>
  );
};

export default Tabs;
