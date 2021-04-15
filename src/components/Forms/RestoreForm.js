import React, { useState} from 'react';
import { validate } from 'email-validator';
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
    const [messageSucces, setMessageSucces] = useState(false);

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
        .then(()=>{ setMessageSucces(true) })
        .catch((error)=>{ setError(true) })
    }

    return(
        <View style={styles.container}>
            <View style={{justifyContent:"center",alignItems:"center",height:height * 0.9,}}>
                <Logo />
                {messageSucces?(<Alert title={"Check your email to change your password!"} type="success" />)
                : error ?(<Alert title={"Check your email if it is correct!!"} type="warning" />):null}
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
                    emailError ? "Please enter your email" : ""
                    }
                />
                {!messageSucces ?<Button title="Confirm" callback={()=>{RestorePassword(email)}}/>: <Button title="Back" callback={()=>{navigation.goBack()}}/>}
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