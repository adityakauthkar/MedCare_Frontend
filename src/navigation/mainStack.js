import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import Tabs from './tabs';
import Account from '../screens/Account';
import Reminders from '../screens/Reminders';
import Home from '../screens/Home';
import PharmacyMaps from '../screens/PharmacyMaps';
import OnboardingScreen from '../onboarding';
import SearchScreen from '../screens/searchScreen';
import ShowReminder from '../screens/Reminders/ShowReminder';
import ShopByCategoryScreen from '../screens/ShopByCategory';
import TopSellingScreen from '../screens/top-sellingScreen';
import Camera from '../screens/camera';
import DiseaseScreen from '../screens/diseaseScreen';


const Stack = createStackNavigator();

const MainStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{headerShown: false}}
      initialRouteName="Home">

      <Stack.Screen name="Home" component={Tabs} />
      <Stack.Screen name="Maps" component={PharmacyMaps} />
      <Stack.Screen name="Reminders" component={Reminders} />
      <Stack.Screen name="Account" component={Account} />
      <Stack.Screen name="Onboarding" component={OnboardingScreen} />
      <Stack.Screen name="SearchScreen" component={SearchScreen} />
      <Stack.Screen name='ShowReminder'  component={ShowReminder} />
     <Stack.Screen name='ShopByCategoryScreen' component={ShopByCategoryScreen}/>
     <Stack.Screen name='TopSellingScreen' component={TopSellingScreen}/>
      <Stack.Screen name='Camera' component={Camera}/>
     <Stack.Screen name='DiseaseScreen' component={DiseaseScreen}/>
    </Stack.Navigator>
  );
};

export default MainStack;
