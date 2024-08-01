import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import { StyleSheet, TextInput, View, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';

const SearchBar = () => {
    const navigation = useNavigation();

    return (
        <View style={styles.container}>
            <View style={styles.main}>
                <Icon name="search-outline" size={30} color="black" style={styles.icon} />
                <TextInput 
                    placeholder='Search Medicines here..' 
                    style={styles.searchText} 
                    accessibilityLabel="Search input"
                    onFocus={() => navigation.navigate('SearchScreen')} // Changed from onPress to onFocus
                />
            </View>
            <TouchableOpacity>
                <Icon name="cart-outline" size={30} color="black" style={styles.cartIcon} />
            </TouchableOpacity>
        </View>
    );
};


const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 20,
        marginLeft: 10,
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
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
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
});

export default SearchBar;
