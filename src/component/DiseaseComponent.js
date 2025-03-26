import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { useNavigation } from '@react-navigation/native';

const DiseaseComponent = () => {
    const navigation = useNavigation();

    return (
        <View style={styles.mainContainer}>
            <TouchableOpacity 
                style={styles.touchableContainer} 
                onPress={() => navigation.navigate('DiseaseScreen')} // Add navigation action here
            >
                {/* Local Image on the left side */}
                <Image
                    source={require('../assets/digonsis.jpg')} // Replace with the path to your image
                    style={styles.image}
                />
                {/* Text on the right side */}
                <View style={styles.textContainer}>
                    <Text style={styles.text}>Diagnose Your Disease</Text>
                </View>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    mainContainer: {
        marginTop: 20,
        marginBottom: 20,
        backgroundColor: '#ADD8E6',
        borderRadius: 15,
        paddingHorizontal: 10, // Padding inside container
    },
    touchableContainer: {
        flexDirection: 'row', // Align items horizontally
        alignItems: 'center', // Center items vertically
    },
    image: {
        width: 100, // Width of the image
        height: 100, // Height of the image
        borderRadius: 10, // Rounded corners for the image
    },
    textContainer: {
        flex: 1, // Take up remaining space for the text
        paddingLeft: 15, // Space between image and text
    },
    text: {
        fontSize: 15,
        fontWeight: 'bold', // Bold text style
        color: '#333', // Darker color for readability
    },
});

export default DiseaseComponent;
