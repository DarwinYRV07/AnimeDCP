import React,{useState} from "react"
import {validate} from 'email-validator'
import {View, StyleSheet,Text,Dimensions,TextInput} from "react-native"
import {Input} from 'react-native-elements'
import Logo from "../shared/Logo"
import Button from "../button/Button";
import {firebase} from "../../Firebase"
import Alert from "../shared/Alert"

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
    const [error, setError] = useState("");


  const handleVerify = (input) =>{
    if(input === 'fullname'){
      if(!fullName){
        setFullNameError(true);
      }else
        setFullNameError(false);
    }else if(input ==='email'){
        if(!email) setEmailError(true)
        else if(!validate(email)) setEmailError(true)
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
  
  const handlerSignUp = async ()=>{
    await firebase
      .auth()
      .createUserWithEmailAndPassword(email,password)
      .then(
        (Response)=>{
          console.log(Response.user);
          const uid =  Response.user.uid;
          const data = {
            id:uid,
            email,
            fullName,
          }

          const usersRef = firebase.firestore().collection("users");
          console.log(usersRef);
          usersRef
          .doc(uid)
          .set(data)
          .then(() => {
            
          })
          .catch((error) => {
            console.log(error);
            setError(error.message);
          });
      })
      .catch((error)=>console.log(error));
  }

  return(
    <View style={styles.container}>
        
        <Logo/>
        {error ? <Alert type="error" title={error} /> : null}
        <Text style={styles.texto}>Fullname:</Text>
        <Input 
          style={styles.input} 
          placeholder="User"
          value={fullName}
          onChangeText = {setFullName}
          onBlur={() => {
            handleVerify("fullname");
          }}
          errorMessage={
            fullNameError ? "Por favor ingresa tu nombre completo" : ""
          }
          /> 
        <Text style={styles.texto}>Email:</Text>
        <Input 
          style={styles.input} 
          placeholder="Email"
          value={email}
          onChangeText = {setEmail}
          onBlur={() => {
            handleVerify("email");
          }}
          autoCapitalize="none"
          errorMessage={
          emailError ? "Por favor ingresa una dirección de correo válida" : ""
          }
          />
        <Text style={styles.texto}>Password:</Text>
        <Input 
          style={styles.input} 
          placeholder="password"
          value={password}
          onChangeText = {setPassword}
          secureTextEntry
          autoCapitalize="none"
          onBlur={() => {
            handleVerify("password");
          }}
          errorMessage={
          passwordError
            ? "Por favor ingresa una contraseña de mínimo 6 caracteres"
            : ""
          }
        /> 
        <Text style={styles.texto}>Confirm Password:</Text>
        <Input 
          style={styles.input} 
          placeholder="Confirm Pasword"
          value={confirmPassword}
          onChangeText = {setConfirmPassword}
          secureTextEntry
          autoCapitalize="none"
          onBlur={() => {
          handleVerify("confirmPassword");
          }}
          errorMessage={
          confirmPasswordError
            ? "Por favor reingresa la contraseña y verifica que es correcta"
            : ""
          }
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