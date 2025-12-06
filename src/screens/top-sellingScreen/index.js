import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import BASE_URL from '../../api/config';

const TopSellingScreen = ({ route }) => {
  const [data, setData] = useState(null);
  const { _id } = route.params;

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const url = `${BASE_URL}/medicine/getMedicineById/${_id}`;

      const response = await axios.get(url);
      const medicine = response.data.data;

      if (medicine) {
        setData(medicine);
      } else {
        console.warn('No medicine found for this ID:', _id);
      }
    } catch (error) {
      console.error('Error fetching medicines:', error);
    }
  };

  return (
    <View style={styles.mainContainer}>

      {data ? (
        <>
          <Image source={{ uri: data.medicineImage }} style={styles.image} />
          <Text >Name : {data.name}</Text>
          <Text>Interactions:  {data.interactions}</Text>
          <Text>Sideeffects: {data.sideEffects}</Text>
          <Text>Instructions {data.instructions}</Text>
          <Text>DosageStrength: {data.dosageStrength}</Text>
          <Text>DosageForm: {data.dosageForm}</Text>
          <Text>Expiry Date: {data.expirationDate}</Text>
          <Text>Price: {data.price}</Text>
          <Text>Stock: {data.stock}</Text>
          <Text>Manufacturer: {data.manufacturer}</Text>
          {/* <Text>{data.category}</Text> */}
          <Text>{data.description}</Text>

          <TouchableOpacity>
           <Text> Add To Cart</Text>
             </TouchableOpacity>
          <TouchableOpacity> 
            <Text>Buy Now</Text>
             </TouchableOpacity>


        </>


      ) : (
        <Text>Loading...</Text>
      )}

    </View>
  );

};




const styles = StyleSheet.create({
  mainContainer: {
    marginLeft: 5,
    backgroundColor: 'white',
    borderRadius: 10,
    shadowColor: 'black',
    shadowOffset: 10,
    shadowOpacity: 10,
  },
  image: {
    width: 140,
    height: 200,
    borderRadius: 10,
    marginTop: 10,
    marginLeft: 10,
    marginRight: 10,
  },

  detailText: {
    fontSize: 'bold'
  }

})

export default TopSellingScreen;
