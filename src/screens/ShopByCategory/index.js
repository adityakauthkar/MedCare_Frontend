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
import BASE_URL from '../../api/config';

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
        `${BASE_URL}/medicine/medicines/category/${categoryId}`
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
    flexDirection: 'row', 
    padding: 15,
    backgroundColor: '#FFF',
    marginBottom: 10,
    borderRadius: 10,
    alignItems: 'center', 
    marginTop:10,
  },
  medicineDetails: {
    flex: 1, 
    paddingLeft: 10, 
    alignItems: 'flex-end', 
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
    backgroundColor: '#ADD8E6', 
    height: 30,
    width: 80,
    alignItems: 'center',
    justifyContent: 'center', 
    marginLeft: 10, 
    borderRadius: 5,
  },
  buyNowText: {
    color: '#FFF',
  },
  buttons: {
    flexDirection: 'row',
    marginTop: 5, 
  },
  cartButton: {
    backgroundColor: '#fff', 
    height: 30,
    width: 80,
    alignItems: 'center',
    justifyContent: 'center', 
    marginRight: 10,
    borderColor: '#ADD8E6',
    borderWidth: 1,
    borderRadius: 5, 
  },
  cartText: {
    color: '#ADD8E6',
  },

  priceText:{
    marginRight:130,
  }
});

export default MedicinesScreen;
