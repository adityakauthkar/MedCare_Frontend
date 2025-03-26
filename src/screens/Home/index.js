import React from 'react';
import {View, ScrollView, StyleSheet} from 'react-native';
import SearchBar from '../../component/searchBar';
import FirstHomeBlock from '../../component/FirstHomeBlock';
import TopSelling from '../../component/TopSelling';
import ShopByCategory from '../../component/shopByCategory';
import DiseaseComponent from '../../component/DiseaseComponent';


const Home = () => {
  return (
    <View style={styles.container}>
      <SearchBar style={styles.searchBar} />
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <FirstHomeBlock />
        <TopSelling />
        <ShopByCategory/>
        <DiseaseComponent/>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  searchBar: {
    position: 'absolute',
    top: 0,
    width: '100%',
    zIndex: 1,
  },
  scrollContent: {
    marginTop: 50, // Adjust this value to match the height of your SearchBar
    paddingBottom: 50, // Add some padding to the bottom if needed
  },
});

export default Home;
