import React,{useState} from "react"
import {validate} from 'email-validator'
import {View, StyleSheet,Text,Dimensions,TextInput} from "react-native"
import {} from 'react-native-elements'
import Logo from "../shared/Logo"
import Button from "../button/Button";
import {firebase} from "../../Firebase"





const { width } = Dimensions.get("screen");


const SignUpForm = ({navigation}) =>{
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [passwordError, setPasswordError] = useState(false);
    const [confirmPassword, setConfirmPassword] = useState(false);
  
  // const handlerSignUp = ()=>{
  //   firebase
  //   .auth()
  //   .createUserWithEmailAndPassword(email,password)
  //   .then(
  //     (Response)=>{console.log(Response);
  //   })
  //   .catch((error)=>console.log(error));
  // }

  return(
    <View style={styles.container}>
        
        <Logo/>
        <Text style={styles.texto}>Fullname:</Text>
        <TextInput 
          style={styles.input} 
          placeholder="User"
          /> 
        <Text style={styles.texto}>Email:</Text>
        <TextInput 
          style={styles.input} 
          placeholder="Email"
          /> 
        <Text style={styles.texto}>Password:</Text>
        <TextInput 
        style={styles.input} 
        placeholder="password"
        /> 
        <Text style={styles.texto}>Confirm Password:</Text>
        <TextInput 
          style={styles.input} 
          placeholder="Confirm Pasword"
        /> 

        <Button title="SIGN UP" />
        
              
    </View>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#2F353A',
    justifyContent: 'center',
    alignItems:"center"
  },
  texto:{
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
  title:{
    alignSelf: "center",
    alignContent:"center",
    padding: 15,
    marginBottom: 10,
    fontSize:28,
    color:"#fff"
    
  }
});


export default SignUpForm;