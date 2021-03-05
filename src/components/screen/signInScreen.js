import React from 'react'
import { Alert, StyleSheet, Text, View, Dimensions } from 'react-native';
import { Image, Input, SocialIcon } from "react-native-elements";
import Button from "../button/Button";

const { width } = Dimensions.get("screen");

const singInScreen = () =>{
    return(
        <View style={styles.container}>
            <Image source={{uri:require("../../assets/imgPrueba.jpg")}} style={styles.logo}/>

            <Text style={styles.texto}>User:</Text>
            <Input style={styles.input} placeholder="User"/> 
            <Text style={styles.texto}>Password:</Text>
            <Input style={styles.input} placeholder="password"/> 

            <Button title="LOGIN"/>
            <SocialIcon title='Sign In' button type='facebook' style={styles.button}/>          
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#2F353A',
      justifyContent: 'center',
      alignItems:"center"
    },
    logo:{
        width: 200, 
        height: 200,
        margin:5,
    },
    texto:{
        color:"#22DEFA",
        marginLeft:15,
        marginTop:10,
        fontSize:20,
    },
    input:{
        backgroundColor:"white",
        color:"black",
        alignContent:"center",
        justifyContent:"center",
        borderRadius:15,
    },
    button: {
        alignSelf: "center",
        padding: 15,
        borderRadius: 30,
        marginBottom: 10,
        width: width * 0.8,
      },
  });

export default singInScreen;