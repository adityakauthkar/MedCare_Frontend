import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  FlatList,
  ActivityIndicator,
  StyleSheet,
  Image,
} from 'react-native';
import axios from 'axios';
import { TouchableOpacity } from 'react-native-gesture-handler';
import SearchBar from '../../component/searchBar';


const MedicinesScreen = ({ route }) => {
  const { categoryId } = route.params; // Get categoryId passed from ShopByCategory
  const [medicines, setMedicines] = useState([]);
  const [loading, setLoading] = useState(true);

  
  useEffect(() => {
    fetchMedicines();
  }, []);

  const fetchMedicines = async () => {
    try {
      const response = await axios.get(
        `http://192.168.221.33:4000/api/medicine/medicines/category/${categoryId}`
      );
      setMedicines(response.data.data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching medicines:', error);
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  return (
    
    <View style={styles.container}>
 <SearchBar/>    

      {medicines.length > 0 ? (
        <FlatList
          data={medicines}
          keyExtractor={item => item._id}
          renderItem={({ item }) => (
            <View style={styles.medicineItem}>
              <Image source={{ uri: item.medicineImage }} style={styles.image} />
              <View style={styles.medicineDetails}>
                <Text style={styles.medicineName}>{item.name}</Text>
                <Text style={styles.priceText}> ₹{item.price}</Text>
                <View style={styles.buttons}>
                  <TouchableOpacity style={styles.cartButton}>
                    <Text style={styles.cartText}>Cart</Text>
                  </TouchableOpacity>
                  <TouchableOpacity style={styles.buyNowButton}>
                    <Text style={styles.buyNowText}>Buy Now</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          )}
        />
      ) : (
        <Text>No medicines available for this category.</Text>
      )}
    </View>
    
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  medicineItem: {
    flexDirection: 'row', // Use row direction to place image and details side by side
    padding: 15,
    backgroundColor: '#FFF',
    marginBottom: 10,
    borderRadius: 10,
    alignItems: 'center', // Center items vertically
    marginTop:10,
  },
  medicineDetails: {
    flex: 1, // Take up remaining space
    paddingLeft: 10, // Add space between image and text
    alignItems: 'flex-end', // Align all items to the right
  },
  medicineName: {
    fontSize: 18,
    fontWeight: 'bold',
    marginRight:80
  },
  image: {
    width: 80,
    height: 80,
    borderRadius: 10,
  },
  buyNowButton: {
    backgroundColor: '#ADD8E6', // Light blue color for the button
    height: 30,
    width: 80,
    alignItems: 'center',
    justifyContent: 'center', // Center the text vertically
    marginLeft: 10, // Space between buttons
    borderRadius: 5,
  },
  buyNowText: {
    color: '#FFF',
  },
  buttons: {
    flexDirection: 'row', // Align buttons in a row
    marginTop: 5, // Space above the buttons
  },
  cartButton: {
    backgroundColor: '#fff', // White background for the button
    height: 30,
    width: 80,
    alignItems: 'center',
    justifyContent: 'center', // Center the text vertically
    marginRight: 10,
    borderColor: '#ADD8E6', // Light blue color for the border
    borderWidth: 1, // Specify the border width to make it visible
    borderRadius: 5, // Optional: Add rounded corners to the border
  },
  cartText: {
    color: '#ADD8E6',
  },

  priceText:{
    marginRight:130,
  }
});

export default MedicinesScreen;
