/* eslint-disable prettier/prettier */
import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Home from '../screens/Home';
import Account from '../screens/Account';
import Reminders from '../screens/Reminders';
import PharmacyMaps from '../screens/PharmacyMaps';
import Icon from 'react-native-vector-icons/Ionicons';
import Camera from '../screens/camera';


const Tab = createBottomTabNavigator();

const Tabs = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ size, color }) => {
          let iconName;
          let iconSize = size;

          if (route.name === 'Home') {
            iconName = 'home-sharp';
          } else if (route.name === 'Maps') {
            iconName = 'map';
          } else if (route.name === 'Camera') {
            iconName = 'camera';
            iconSize = size + 15; // Increase size for Camera icon
          } else if (route.name === 'Account') {
            iconName = 'person';
          } else if (route.name === 'Reminders') {
            iconName = 'notifications';
          }

          return <Icon name={iconName} size={iconSize} color={color} />;
        },
        tabBarIconStyle: route.name === 'Camera' ? { marginBottom: -10 } : {}, // Adjust Camera icon position
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
      <Tab.Screen name="Camera" component={Camera} />
      <Tab.Screen name="Reminders" component={Reminders} />
      <Tab.Screen name="Account" component={Account} />
    </Tab.Navigator>
  );
};

export default Tabs;
