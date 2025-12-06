/* eslint-disable prettier/prettier */
import React, { useEffect, useState } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, ActivityIndicator } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { getCategories } from '../api/api'; 

const ShopByCategory = () => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigation = useNavigation();

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            const categories = await getCategories(); 
            setData(categories);
        } catch (error) {
            console.error('Error fetching data:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleCategoryPress = (categoryId) => {
        navigation.navigate('ShopByCategoryScreen', { categoryId });
    };

    const renderItem = ({ item }) => (
        <View style={styles.itemContainer}>
            <TouchableOpacity onPress={() => handleCategoryPress(item._id)}>
                <View style={styles.imageView}>
                    <Image source={{ uri: item.categoryImage }} style={styles.image} />
                    <Text style={styles.itemName}>{item.name}</Text>
                </View>
            </TouchableOpacity>
        </View>
    );

    const renderGrid = () => {
        const rows = [];
        for (let i = 0; i < data.length; i += 3) {
            rows.push(data.slice(i, i + 3));
        }

        return rows.map((row, rowIndex) => (
            <View key={rowIndex} style={styles.row}>
                {row.map((item) => (
                    <View key={item._id} style={styles.item}>
                        {renderItem({ item })}
                    </View>
                ))}
            </View>
        ));
    };

    if (loading) {
        return (
            <View style={styles.loadingContainer}>
                <ActivityIndicator size="large" color="#0000ff" />
            </View>
        );
    }

    return (
        <View style={styles.mainContainer}>
            <View style={styles.container}>
                <Text style={styles.heading}>Shop By Categories</Text>
                <View style={styles.gridContainer}>{renderGrid()}</View>
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
    gridContainer: {
        paddingHorizontal: 10,
    },
    row: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 10,
    },
    itemContainer: {
        borderColor: 'red',
        marginRight: 15,
        alignItems: 'center',
        flex: 1,
    },
    image: {
        width: 80,
        height: 80,
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
        borderRadius: 10,
        backgroundColor: '#fff',
        borderColor: '#C0C0C0',
        marginTop: 15,
    },
    imageView: {
        height: 150,
        borderRadius: 10,
        borderColor: 'red',
    },
    item: {
        flex: 1,
        marginRight: 10,
    },
});

export default ShopByCategory;
