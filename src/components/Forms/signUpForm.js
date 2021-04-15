import React,{useState,useEffect,useContext} from "react"
import {validate} from 'email-validator'
import {View, StyleSheet,Text,Dimensions,TextInput} from "react-native"
import Logo from "../shared/Logo"
import Button from "../button/button";
import Alert from "../shared/Alert"
import { Context as AuthContext } from "../../providers/AuthContext";

const { width } = Dimensions.get("screen");


const SignUpForm = ({navigation}) =>{
    const {state,signup,clearErrorMessage} = useContext(AuthContext);

    const [fullName,setFullName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const [passwordError, setPasswordError] = useState(false);
    const [emailError,setEmailError] = useState(false);
    const [fullNameError,setFullNameError] = useState(false);
    const [confirmPasswordError,setConfirmPasswordError] = useState(false)
    const [error, setError] = useState("");

    useEffect(() => {
      if (state.errorMessage) clearErrorMessage();
    }, []);
  
    useEffect(() => {
      if (state.errorMessage) setError(state.errorMessage);
    }, [state.errorMessage]);
  
    useEffect(() => {
      if (state.registered) navigation.navigate("BottonTabs");
    }, [state]);


  const handleVerify = (input) =>{
    console.log("found")
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
        console.log(fullName)
        console.log(password)
        console.log(email)
    }else if (input === "signup"){
        signup(fullName,email,password)
    }
  }
  

  return(
    <View style={styles.container}>
      <View style={{marginTop:38,justifyContent:"center",alignItems:"center"}}>
        <Logo/>
          {error ? <Alert type="error" title={error} /> : null}
          <Text style={styles.texto}>Fullname:</Text>
          <TextInput 
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
            emailError ? "Por favor ingresa una dirección de correo válida" : ""
            }
            />
          <Text style={styles.texto}>Password:</Text>
          <TextInput 
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
          <TextInput 
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

          <Button title="SIGN UP" callback={()=>{handleVerify("signup")}}/>
      </View>        
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