import React from "react";
import { View, StyleSheet, TouchableOpacity, Text } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';


const FirstHomeBlock = () => {
    return (
        <View style={styles.mainContainer}>

            <View style={styles.innerContainer}>
            <TouchableOpacity style={styles.innerFirstBlock} />
            <TouchableOpacity style={styles.innerSecondBlock} />
            </View>

            <View style={styles.order}>
                <Text style={styles.orderText}>OR YOU CAN ORDER VIA</Text>
            </View>


            <View style={styles.orderView}>
               <TouchableOpacity style={styles.whatsApp}>
                <Icon name="logo-whatsapp" size={20} color="black" />
                <Text style={styles.whatsAppText}>WhatsApp</Text>
                </TouchableOpacity>
             <TouchableOpacity style={styles.prescription}> 
             <Icon name="camera" size={20} color="black" />
                <Text style={styles.whatsAppText}> Prescription</Text>
                </TouchableOpacity>
            <TouchableOpacity style={styles.call}> 
            <Icon name="call" size={20} color="black" />
                <Text style={styles.whatsAppText}>Call </Text>
                </TouchableOpacity>
            </View>


        </View>
    );
}

const styles = StyleSheet.create({
    mainContainer: {
        backgroundColor: "#ADD8E6",
        height: 230,
        width: 360,
        borderColor: "#C0C0C0",
        borderRadius: 10,
        marginTop: 15,
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },
    innerFirstBlock: {
        backgroundColor: "#FFF",
        height: 100,
        width: 140,
        borderColor: "#C0C0C0",
        borderRadius: 5,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 1.84,
        elevation: 5,
        marginTop: 40

    },
    innerSecondBlock: {
        backgroundColor: "#ffffff",
        height: 100,
        width: 140,
        borderColor: "#C0C0C0",
        borderRadius: 5,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 1.84,
        elevation: 5,
        marginTop: 40
    },


    order:{
        
    },


    innerContainer: { 
        flexDirection: 'row',
        justifyContent: 'space-around',
    },
    orderText:{
        fontSize:10,
        fontWeight:'400',
        marginLeft:100,
        marginTop:10
    },


    orderView:{
        flexDirection:'row',
        marginTop:10,
    },

    whatsApp:{
        backgroundColor: "#fff",
        height: 25,
        width: 110,
        borderRadius: 15,
        borderWidth: 1,
        borderColor: "#C0C0C0",
        flexDirection: 'row',
        alignItems: 'center',
        marginLeft: 18,
        paddingHorizontal: 5,
     
        
        
    },

    prescription:{
        backgroundColor: "#fff",
        height: 25,
        width: 120,
        borderRadius: 15,
        borderWidth: 1,
        borderColor: "#C0C0C0",
        flexDirection: 'row',
        alignItems: 'center',
        marginLeft: 15,
        paddingHorizontal: 5,
    },

    call:{
        backgroundColor: "#fff",
        height: 25,
        width: 60,
        borderRadius: 10,
        borderWidth: 1,
        borderColor: "#C0C0C0",
        flexDirection: 'row',
        alignItems: 'center',
        marginLeft: 20,
        paddingHorizontal: 5,
    },
    whatsAppText:{
        fontSize:10,
        fontWeight:'800'
    }


});

export default FirstHomeBlock;
