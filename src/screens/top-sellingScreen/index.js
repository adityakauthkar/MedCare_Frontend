import React, { useEffect, useState } from "react";
import { Text, View, FlatList, ActivityIndicator } from 'react-native';


const TopSellingScreen = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchTopSellingMedicines();
  }, []); // Dependency array added to only call on initial render

  const fetchTopSellingMedicines = async () => {
    try {
      const url = 'http://192.168.221.33:4000/api/medicine/top-selling'; // Removed extra slash
      const response = await fetch(url);
      const result = await response.json(); // Parsing JSON response
      setData(result.data); // Assuming result has a `data` property
      setLoading(false); // Set loading to false after data is fetched
    } catch (error) {
      console.error("Error fetching medicines:", error);
      setLoading(false); // Ensure loading is set to false even if an error occurs
    }
  };

  return (
    <View style={{ flex: 1, padding: 20 }}>
      <Text style={{ fontSize: 20, fontWeight: 'bold' }}>Top Selling Products</Text>

      {loading ? (
        <ActivityIndicator size="large" color="#0000ff" />
      ) : (
        <FlatList
          data={data}
          keyExtractor={(item) => item._id}
          renderItem={({ item }) => (
            <View style={{ marginVertical: 10 }}>
              <Text style={{ fontSize: 18 }}>{item.name}</Text>
              <Text style={{ color: 'gray' }}>Price: ₹{item.price}</Text>
            </View>
          )}
          ListEmptyComponent={<Text>No top-selling medicines available.</Text>}
        />
      )}
    </View>
  );
};

export default TopSellingScreen;
