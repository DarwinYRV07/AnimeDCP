import React,{useState} from "react"
import {validate} from 'email-validator'
import {View, StyleSheet,Text,Dimensions,TextInput} from "react-native"
import {} from 'react-native-elements'
import Logo from "../shared/Logo"
import Button from "../button/Button";
import {firebase} from "../../Firebase"

const { width } = Dimensions.get("screen");


const SignUpForm = ({navigation}) =>{
    const [fullName,setFullName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const [passwordError, setPasswordError] = useState(false);
    const [emailError,setEmailError] = useState(false);
    const [fullNameError,setFullNameError] = useState(false);
    const [confirmPasswordError,setConfirmPasswordError] = useState(false)


  const handlerVerify = (input) =>{
    if(input === 'fullname'){
      if(!fullName){
        setFullNameError(true);
      }else
        setFullNameError(false);
    }else if(input ==='email'){
        if(!email) setEmailError(true)
        else if(validate(email)) setEmailError(true)
        else setEmailError(false)
    }else if(input ==='password'){
        if(!password)setPasswordError(true)
        else if(password.length<6)setPasswordError(true)
        else setPasswordError(false)
    }else if(input ==='confirmPassword'){
        if(!confirmPasswordError) setConfirmPasswordError(true)
        else if(confirmPasswordError !== password) setConfirmPasswordError(true)
        else setConfirmPasswordError(false);
    }
  }
  
  const handlerSignUp = ()=>{
    firebase
    .auth()
    .createUserWithEmailAndPassword(email,password)
    .then(
      (Response)=>{console.log(Response);
    })
    .catch((error)=>console.log(error));
  }

  return(
    <View style={styles.container}>
        
        <Logo/>
        <Text style={styles.texto}>Fullname:</Text>
        <TextInput 
          style={styles.input} 
          placeholder="User"
          value={fullName}
          onChangeText = {setFullName}
          autoCapitalize
          
          /> 
        <Text style={styles.texto}>Email:</Text>
        <TextInput 
          style={styles.input} 
          placeholder="Email"
          value={email}
          onChangeText = {setEmail}
          autoCapitalize="none"
          /> 
        <Text style={styles.texto}>Password:</Text>
        <TextInput 
          style={styles.input} 
          placeholder="password"
          value={password}
          onChangeText = {setPassword}
          secureTextEntry
          autoCapitalize="none"
        /> 
        <Text style={styles.texto}>Confirm Password:</Text>
        <TextInput 
          style={styles.input} 
          placeholder="Confirm Pasword"
          value={confirmPassword}
          onChangeText = {setConfirmPassword}
          secureTextEntry
          autoCapitalize="none"
        /> 

        <Button title="SIGN UP" callback={handlerSignUp}/>
        
              
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