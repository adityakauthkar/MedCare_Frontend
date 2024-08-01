// HorizontalList.js
import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  Image,
  FlatList,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import axios from 'axios';

const HorizontalList = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get('http://192.168.1.204:4000/api/medicine/getAllMedicines');
      setData(response.data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching data:', error);
      setLoading(false);
    }
  };

  const renderItem = ({item}) => (
    <View style={styles.itemContainer}>
      <TouchableOpacity>
        <View style={styles.imageView}>
          <Image source={{uri: item.medicineImage}} style={styles.image} />
          <Text style={styles.itemName}>{item.name}</Text>
        </View>
      </TouchableOpacity>
    </View>
  );

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <Text>Loading...</Text>
      </View>
    );
  }

  return (
    <View style={styles.mainContainer}>
      <View style={styles.container}>
        <Text style={styles.heading}>Our Top Selling Products</Text>
        <FlatList
          data={data}
          renderItem={renderItem}
          keyExtractor={(item, index) =>
            item._id ? item._id.toString() : index.toString()
          }
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.listContainer}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 10,
    marginTop: 20,
  },
  heading: {
    marginLeft: 10,
    color: 'skyblue',
    fontSize: 13,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  listContainer: {
    paddingHorizontal: 10,
  },
  itemContainer: {
    borderColor:'red',
    marginRight: 15,
    alignItems: 'center',
  },
  image: {
    width: 100,
    height: 100,
    borderRadius: 10,
  },
  itemName: {
    marginTop: 5,
    fontSize: 12,
    fontWeight: 'bold',
    marginLeft: 10,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },

  mainContainer: {
    height: 200,
    borderRadius: 10,
    backgroundColor: '#fff',
    borderColor: '#C0C0C0',
    marginTop: 15,
  },
  imageView: {
    height: 150,
    // width: 100,
    borderRadius: 10,
    borderColor: 'red',
  },
});

export default HorizontalList;
