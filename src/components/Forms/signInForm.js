import React, { useState } from 'react';
import { SocialIcon } from "react-native-elements";
import { validate } from "email-validator";
import { firebase } from "../../firebase";
import Button from "../button/Button";
import { StyleSheet, Text, View, Dimensions, TextInput } from 'react-native';

const { width, height } = Dimensions.get("screen");

const signInForm =({navigation})=>{
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [emailError, setEmailError] = useState(false);
    const [passwordError, setPasswordError] = useState(false);
    const [error, setError] = useState(false);


     // Verificar si se ingreso los datos del email y el password
  const handleVerify = (textInput) => {
    if (textInput === "email") {
      if (!email) setEmailError(true);
      else if (!validate(email)) setEmailError(true);
      else setEmailError(false);
    } else if (textInput === "password") {
      if (!password) setPasswordError(true);
      else setPasswordError(false);
    }
  };

  const handleSignin = () => {
    firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then((response) => console.log(response))
      .catch((error) => {
        setError(error.message);
      });
  };

    return(
        <View>
            <Text style={styles.text}>User:</Text>
            <TextInput 
                style={styles.input} 
                placeholder="Email"    
                value={email} 
                onChange={setEmail}
                autoCapitalize="none"
               // onBlur={() => {handleVerify("email");}}errorMessage={ emailError? "Por favor ingresa tu cuenta de correo electrónico": null}
                  
            />

            <Text style={styles.text}>Password:</Text>
            <TextInput  
                style={styles.input} 
                placeholder={"Password"} 
                value={password} 
                onChange={setPassword}
                secureTextEntry
                autoCapitalize="none"
                onBlur={() => {handleVerify("password");}}errorMessage={passwordError ? "Por favor ingresa tu contraseña" : null}
            />

            <Button title="Login" />
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