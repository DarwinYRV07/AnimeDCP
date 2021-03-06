import React, { useState } from 'react';
import { SocialIcon } from "react-native-elements";
import { StyleSheet, Text, View, Dimensions, TextInput } from 'react-native';
import Button from "../button/Button";
const { width, height } = Dimensions.get("screen");

const signInForm =()=>{
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState(false);

    return(
        <View>
            <Text style={styles.text}>User:</Text>
            <TextInput 
                style={styles.input} 
                placeholder="Email"    
                value={email} 
                onChange={setEmail}
            />

            <Text style={styles.text}>Password:</Text>
            <TextInput  
                style={styles.input} 
                placeholder={"Password"} 
                value={password} 
                onChange={setPassword}
            />
            
            <Button title="Login"/>
            <SocialIcon style={styles.button} title='Sign In' button type='facebook'/>
        </View>
    );
};
const styles = StyleSheet.create({
    text:{
        color:"white",
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
        marginBottom:5
    },
    button: {
        alignSelf: "center",
        padding: 15,
        borderRadius: 30,
        marginBottom: 10,
        width: width * 0.8,
      },
});

export default signInForm;