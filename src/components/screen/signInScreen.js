import React from 'react'
import { Alert, StyleSheet, Text, View, Dimensions, TextInput } from 'react-native';
import { Image, Input, SocialIcon } from "react-native-elements";
import Button from "../button/Button";
import Logo from "../shared/Logo";

const { width } = Dimensions.get("screen");

const signInScreen = () =>{
    return(
        <View style={styles.container}>
            
            <Logo/>
            <Text style={styles.text}>User:</Text>
            <TextInput style={styles.input} placeholder="User"/> 
            <Text style={styles.text}>Password:</Text>
            <TextInput style={styles.input} placeholder="password"/> 

            <Button title="LOGIN"/>
            <SocialIcon title='Sign In' button type='facebook' style={styles.button}/>
            <Button title="Sign In"/>          
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
    text:{
        color:"#22DEFA",
        marginLeft:15,
        marginTop:10,
        marginBottom:10,
        fontSize:20,
        textAlign:"left",
        width:width*0.9
    },
    input:{
        backgroundColor:"#fff",
        color:"#000",
        textAlign:"left",
        paddingLeft:10,
        justifyContent:"center",
        borderRadius:15,
        width: width*0.9,
        height: 40,
        marginBottom:20
    },
    button: {
        alignSelf: "center",
        padding: 15,
        borderRadius: 30,
        marginBottom: 10,
        width: width * 0.8,
      },
  });

export default signInScreen;