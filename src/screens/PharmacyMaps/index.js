import React, { useState, useEffect } from "react";
import { View, Text, TouchableOpacity, PermissionsAndroid, Button, FlatList, Alert, StyleSheet } from 'react-native';
import Geolocation from '@react-native-community/geolocation';
import { ScrollView } from "react-native-gesture-handler";

const PharmacyStore = () => {
  const [currentLocation, setCurrentLocation] = useState(null);
  const [storeData, setStoreData] = useState([]); // Store fetched data here

  // Request location permission on component mount
  useEffect(() => {
    requestLocationPermission();
  }, []);

  const requestLocationPermission = async () => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        {
          title: 'Location Permission',
          message: 'Medcare App needs access to your location',
          buttonNeutral: 'Ask Me Later',
          buttonNegative: 'Cancel',
          buttonPositive: 'OK',
        },
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        console.log('Location permission granted');
        getCurrentLocation(); // Get location if permission is granted
      } else {
        console.log('Location permission denied');
      }
    } catch (err) {
      console.warn(err);
    }
  };

  const getCurrentLocation = () => {
    Geolocation.getCurrentPosition(
      position => {
        const { latitude, longitude } = position.coords;
        setCurrentLocation({ latitude, longitude });
        console.log('Latitude:', latitude, 'Longitude:', longitude);
      },
      error => {
        alert(`Error: ${error.message}`);
      },
      { enableHighAccuracy: false, timeout: 15000, maximumAge: 10000 }
    );
  };

  const getNearestPharmacyStore = async () => {
    if (currentLocation) {
      try {
        const response = await fetch('http://192.168.221.33:4000/api/pharmacyStore/findStore', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            latitude: currentLocation.latitude,
            longitude: currentLocation.longitude,
          }),
        });

        const data = await response.json();

        if (response.ok) {
          console.log('Nearest Pharmacy Stores:', data.data);
          setStoreData(data.data); // Set store data for FlatList
        } else {
          console.error('Error fetching stores:', data);
          Alert.alert('Error', 'Failed to get stores.');
        }
      } catch (error) {
        console.error('API Error:', error);
        Alert.alert('Error', 'An error occurred while fetching pharmacy stores.');
      }
    } else {
      Alert.alert('Location Not Available', 'Please allow location access and try again.');
    }
  };

  // Render each item in the FlatList
  const renderItem = ({ item }) => (
    <ScrollView style={styles.renderContainer}>
      <Text style={styles.Text}><Text style={{fontWeight:"bold"}}>Pharmacy Name: </Text>{item.vendor_id}</Text>
      <Text style={styles.Text}><Text style={{fontWeight:"bold"}}>Address: </Text>{item.address}</Text>
      <Text style={styles.Text}><Text style={{fontWeight:"bold"}}>Pin: </Text>{item.pin}</Text>
    </ScrollView>
  );

  return (
    <View>
     
     
      <TouchableOpacity onPress={getCurrentLocation}>
       
      </TouchableOpacity>

      <Button title="Get Nearest Stores" onPress={getNearestPharmacyStore} />

      {/* Render FlatList to show vendor_id, address, and pin */}
      {storeData.length > 0 ? (
        <FlatList
          data={storeData}
          renderItem={renderItem}
          keyExtractor={(item) => item._id} // Unique key for each item
        />
      ) : (
        <Text>No stores found</Text>
      )}
    </View>
  );
};




const styles = StyleSheet.create({
  renderContainer: {
    backgroundColor: "#ADD8E6",
    borderRadius: 10,
    borderColor: "black",
    height: 100,
    width: 350,
    marginLeft: 6,
    marginRight: 6,
    marginTop: 10,
    // paddingBottom:20,
  },

  Text: {
    marginLeft: 10,
  }
})



export default PharmacyStore;
