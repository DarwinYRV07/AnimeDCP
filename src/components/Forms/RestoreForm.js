import { validate } from 'email-validator';
import React, { useState} from 'react';
import { View, StyleSheet, Text, Dimensions,TextInput } from "react-native"
import { firebase } from "../../Firebase/index";
import Button from "../button/button";
import Logo from "../shared/Logo";
import Alert from "../shared/Alert";

const {width,height} = Dimensions.get("screen");

const RestoreForm = ({navigation}) =>{
    const [email,setEmail] = useState("");
    const [error, setError] = useState(false);
    const [emailError, setEmailError] = useState(false);

    const handleVerify = (input)=>{
        if(input === "email"){
            if(!email) setEmailError(true)
            else if(!validate(email)) setEmailError(true)
            else setEmailError(false)
            }
    }

    const RestorePassword = (email)=>{
        const auth = firebase.auth();
        const emailAddress = email;
        console.log("Correo: " + emailAddress)
        auth.sendPasswordResetEmail(emailAddress)
        .then(()=>{navigation.goBack()})
        .catch((error)=>{console.log(error);})
    }

    return(
        <View style={styles.container}>
            <View style={{justifyContent:"center",alignItems:"center",height:height * 0.9,}}>
                <Logo />
                {error ? <Alert title={error} type="error" /> : null}
                <Text style={styles.texto}>Your Email:</Text>
                <TextInput 
                    style={styles.input} 
                    placeholder="Email"
                    value={email}
                    onChangeText = {setEmail}
                    onBlur={() => {
                    handleVerify("email");
                    }}
                    autoCapitalize="none"
                    errorMessage={
                    emailError ? "Por favor ingresa tu correo" : ""
                    }
                />
                <Button title="Confirm" callback={()=>{RestorePassword(email)}}/>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#2F353A',
        alignItems: 'center',
        justifyContent: 'center',
        
      },
    texto:{
        color:"#22DEFA",
        marginLeft:15,
        marginTop:10,
        marginBottom:10,
        fontSize:20,
        textAlign:"left",
        width:width*0.9,
        
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
        marginBottom:20,
    },
})

export default RestoreForm;