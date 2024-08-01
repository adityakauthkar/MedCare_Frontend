import { createStackNavigator } from '@react-navigation/stack';
import React, { useState, useCallback } from 'react';
import { StyleSheet, TextInput, View, Text, ScrollView, ActivityIndicator } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';
import debounce from 'lodash.debounce';

const SearchScreen = () => {
    const [data, setData] = useState([]);
    const [query, setQuery] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const searchMedicine = async (text) => {
        setQuery(text);
        if (text.length > 0) {
            setLoading(true);
            setError(null);
            try {
                const url = `http://192.168.1.204:4000/api/medicine/searchMedicine?query=${text}`;
                let result = await fetch(url);
                result = await result.json();
                if (result) {
                    setData(result);
                }
            } catch (error) {
                console.error('Error fetching data: ', error);
                setError('Failed to fetch data');
            } finally {
                setLoading(false);
            }
        } else {
            setData([]);
        }
    };

    const debouncedSearchMedicine = useCallback(debounce(searchMedicine, 300), []);

    return (
        <View style={styles.container}>
            <View style={styles.main}>
                <Icon name="search-outline" size={30} color="black" style={styles.icon} />
                <TextInput
                    placeholder='Search Medicines here..'
                    style={styles.searchText}
                    accessibilityLabel="Search input"
                    onChangeText={(text) => debouncedSearchMedicine(text)}
                    value={query}
                />
            </View>
            {loading ? (
                <ActivityIndicator size="large" color="#0000ff" style={styles.loader} />
            ) : (
                <ScrollView style={styles.resultsContainer}>
                    {error ? (
                        <Text style={styles.errorText}>{error}</Text>
                    ) : (
                        data.length ? data.map((item) => (
                            <View key={item.id} style={styles.resultItem}>
                                <Text>{item._id}</Text>
                            </View>
                        )) : (
                            <Text style={styles.noResultsText}>No results found</Text>
                        )
                    )}
                </ScrollView>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 10,
    },
    main: {
        backgroundColor: '#fff',
        height: 45,
        width: '100%',
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
        marginBottom: 10,
    },
    searchText: {
        flex: 1,
        paddingVertical: 0,
    },
    icon: {
        marginLeft: 10,
    },
    resultsContainer: {
        flex: 1,
        marginTop: 10,
    },
    resultItem: {
        padding: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
    },
    loader: {
        marginTop: 20,
    },
    errorText: {
        color: 'red',
        textAlign: 'center',
        marginTop: 20,
    },
    noResultsText: {
        textAlign: 'center',
        marginTop: 20,
    },
});

export default SearchScreen;
