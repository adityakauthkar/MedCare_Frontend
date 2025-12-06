import React, { useState } from 'react';
import { 
  StyleSheet, 
  TextInput, 
  View, 
  TouchableOpacity, 
  Text, 
  FlatList, 
  Image 
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { searchMedicines } from '../../api/api';

const SearchScreen = () => {
  const [data, setData] = useState([]);

  const handleSearch = async (text) => {
    if (!text.trim()) {
      setData([]); // clear list if input empty
      return;
    }

    try {
      const results = await searchMedicines(text);
      setData(results);
    } catch (error) {
      console.error("Search error:", error);
      setData([]);
    }
  };

  return (
    <View style={styles.pageContainer}>
      {/* SearchBar */}
      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        <View style={styles.main}>
          <Icon name="search-outline" size={30} color="black" style={styles.icon} />
          <TextInput
            placeholder="Search Medicines here..."
            style={styles.searchText}
            onChangeText={handleSearch} 
          />
        </View>
        <TouchableOpacity>
          <Icon name="cart-outline" size={30} color="black" style={styles.cartIcon} />
        </TouchableOpacity>
      </View>

      {/* Results */}
      <View style={styles.listContainer}>
        {data.length > 0 ? (
          <FlatList
            data={data}
            keyExtractor={(item) => item._id}
            renderItem={({ item }) => (
              <View style={styles.medicineItem}>
                <Image source={{ uri: item.medicineImage }} style={styles.image} />
                <View style={styles.medicineDetails}>
                  <Text style={styles.medicineName}>{item.name}</Text>
                  <Text style={styles.priceText}>₹{item.price}</Text>
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
    </View>
  );
};

const styles = StyleSheet.create({
  pageContainer: {
    flex: 1,
    padding: 10,
    backgroundColor: '#f5f5f5',
  },
  main: {
    backgroundColor: '#fff',
    height: 45,
    width: 275,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: '#C0C0C0',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    elevation: 5,
  },
  searchText: {
    flex: 1,
    paddingVertical: 0,
  },
  icon: {
    marginLeft: 10,
  },
  cartIcon: {
    marginLeft: 20,
  },
  listContainer: {
    flex: 1,
    marginTop: 20,
  },
  medicineItem: {
    flexDirection: 'row',
    padding: 15,
    backgroundColor: '#FFF',
    marginBottom: 10,
    borderRadius: 10,
    alignItems: 'center',
  },
  medicineDetails: {
    flex: 1,
    paddingLeft: 10,
  },
  medicineName: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  priceText: {
    fontSize: 16,
    color: '#888',
    marginTop: 5,
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
});

export default SearchScreen;
