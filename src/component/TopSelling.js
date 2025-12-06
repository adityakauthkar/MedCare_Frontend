// HorizontalList.js
import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  Image,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { getTopSelling } from "../api/api"; 
import SearchBar from "./searchBar";


const HorizontalList = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigation = useNavigation();

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const topSelling = await getTopSelling();
      setData(topSelling);
    } catch (error) {
      console.log("Error fetching data:", error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleTopSellingOnpress = (_id) => {
    navigation.navigate("TopSellingScreen", {_id});
  };

  const renderItem = ({ item }) => (
    <View style={styles.itemContainer}>
      <TouchableOpacity onPress={() => handleTopSellingOnpress(item._id)}>
        <View style={styles.imageView}>
          <Image source={{ uri: item.medicineImage }} style={styles.image} />
          <Text style={styles.itemName}>{item.name}</Text>
        </View>
      </TouchableOpacity>
    </View>
  );

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="skyblue" />
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
    color: "skyblue",
    fontSize: 13,
    fontWeight: "bold",
    marginBottom: 10,
  },
  listContainer: {
    paddingHorizontal: 10,
  },
  itemContainer: {
    marginRight: 15,
    alignItems: "center",
  },
  image: {
    width: 100,
    height: 100,
    borderRadius: 10,
  },
  itemName: {
    marginTop: 5,
    fontSize: 12,
    fontWeight: "bold",
    marginLeft: 10,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  mainContainer: {
    height: 200,
    borderRadius: 10,
    backgroundColor: "#fff",
    borderColor: "#C0C0C0",
    marginTop: 15,
  },
  imageView: {
    height: 150,
    borderRadius: 10,
  },
});

export default HorizontalList;
