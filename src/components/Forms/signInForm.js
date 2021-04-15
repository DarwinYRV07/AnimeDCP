import React, { useState,useEffect,useContext} from 'react';
import { SocialIcon } from "react-native-elements";
import { validate } from "email-validator";
import Button from "../button/button";
import Alert from "../shared/Alert"; 
import { StyleSheet, Text, View, Dimensions, TextInput } from 'react-native';
import { Context as AuthContext } from "../../providers/AuthContext";



const { width, height } = Dimensions.get("screen");

const signInForm =({navigation})=>{
    const { state, signin, clearErrorMessage } = useContext(AuthContext);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [emailError, setEmailError] = useState(false);
    const [passwordError, setPasswordError] = useState(false);
    const [error, setError] = useState("");

    useEffect(() => {
      if (state.errorMessage) clearErrorMessage();
    }, []);
  
    useEffect(() => {
      if (state.errorMessage) setError(state.errorMessage);
    }, [state.errorMessage]);

     // Verificar si se ingreso los datos del email y el password
  const handleVerify = (input) => {
    if (input === "email") {
      if (!email) setEmailError(true);
      else if (!validate(email)) setEmailError(true);
      else setEmailError(false);
    } else if (input === "password") {
      if (!password) setPasswordError(true);
      else setPasswordError(false);
    }
  };

  const signInAsync=()=>{
      console.log("PENDIENTE SIGNIN")
  }

  const handleSignin = () => {
     signin(email, password);
  };

    return(
        <View>

            {error ? <Alert title={error} type="error" /> : null}
            <Text style={styles.text}>User:</Text>
            <TextInput 
                style={styles.input} 
                placeholder="Email"    
                value={email} 
                onChangeText={setEmail}
                autoCapitalize="none"
                onBlur={() => {handleVerify("email");}}errorMessage={ emailError? "Please enter your email account": null} 
            />

            <Text style={styles.text}>Password:</Text>
            <TextInput  
                style={styles.input} 
                placeholder={"Password"} 
                value={password} 
                onChangeText={setPassword}
                secureTextEntry
                autoCapitalize="none"
                onBlur={() => {handleVerify("password");}}errorMessage={passwordError ? "Please enter your password" : null}
            />
            <Button title="Login"  callback={handleSignin} />
            <SocialIcon onPress={()=>{signInAsync()}} style={styles.button} title='Sign In' button type='google'/>
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