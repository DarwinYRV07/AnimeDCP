import React, { useState} from 'react';
import { View, StyleSheet, Text, TextInput, Dimensions } from "react-native"
import { Input } from 'react-native-elements';
import { firebase } from "../../Firebase/index";
import Button from "../button/Button";
import Logo from "../shared/Logo"

const {width} = Dimensions.get("screen");

const changePwdForm = ({navigation}) =>{
  
  const [current, setCurrent] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  
  const [currentError, setCurrentError] = useState("");
  const [newPasswordError, setNewPasswordError] = useState("");
  const [confirmPasswordError, setConfirmPasswordError] = useState("");
  const [error, setError] = useState("");

  const handleVerify = (input) => {
    if (input === "current") {
      // Verificar el correo electrónico
      if (!current) setCurrentError(true);
      else if (!validate(current)) setCurrentError(true);
      else setCurrentError(false);
    } else if (input === "newPassword") {
      // Verificar la contraseña
      if (!newPassword) setNewPasswordError(true);
      else if (newPassword.length < 6) setNewPasswordError(true);
      else setNewPasswordError(false);
    } else if (input === "confirmPassword") {
      // Verificar la confirmación de la contraseña
      if (!confirmPassword) setConfirmPasswordError(true);
      else if (confirmPassword !== newPassword) setConfirmPasswordError(true);
      else setConfirmPasswordError(false);
    }
  };

  const handlecurrentPwd = (current) =>{
    const user = firebase.auth().currentUser;
    const cred = firebase.auth.EmailAuthProvider.credential(user.email,current);
    
    return user.reauthenticateWithCredential(cred);
  };

  const handlechangePwd = () => {
    firebase
    .auth()

    handlecurrentPwd(current).then(()=>{
      const user = firebase.auth().currentUser;
      const newPaswword = newPassword;
      user.updatePassword(newPaswword).then((response)=> {
        console.log("Se logro!!!!!");
        navigation.navigate("SignIn");
      })
      .catch(function(error) {
        console.log("Muertos !!!!!");
      });
    })
    .catch(()=>{
      console.log("Un fallo en el current")
    })

    

  };



    return(
        <View style={styles.container}>
            <Logo/>
            <Text style={styles.title}>Change password</Text>
            <Text style={styles.text}>Current password</Text>
            <Input style={styles.input} 
                placeholder="current"
                value={current}
                onChangeText={setCurrent}
                autoCapitalize="none"
                onBlur={() => {
                  handleVerify("current");
                }}
                errorMessage={
                  currentError ? "Por favor ingresa la ultima contraseña" : ""
                }
            />
            <Text style={styles.text}>New password</Text>
            <Input style={styles.input} 
                placeholder="New Password"
                value={newPassword}
                onChangeText={setNewPassword}
                autoCapitalize="none"
                onBlur={() => {
                  handleVerify("newPassword");
                }}
                errorMessage={
                  newPasswordError ? "Por favor ingresa la nueva contraseña" : ""
                }
            />
            <Text style={styles.text}>Confirm password</Text>
            <Input style={styles.input} 
                placeholder="New Password"
                value={confirmPassword}
                onChangeText={setConfirmPassword}
                autoCapitalize="none"
                onBlur={() => {
                  handleVerify("confirmPassword");
                }}
                errorMessage={
                  confirmPasswordError ? "Por favor ingresa bien la contraseña" : ""
                }
            />
            <Button title="SAVE"  callback={handlechangePwd}/>
        </View>
    )
}


const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#2F353A',
      alignItems: 'center',
      justifyContent: 'center',
    },
    text: {
      color:'#22DEFA',
      marginLeft: 15,
      marginTop:10,
      marginBottom:10,
      fontSize:20,
      textAlign:'left',
      width: width*0.9
    },
    input: {
      backgroundColor:'#FFF',
      color:'#000',
      textAlign:'left',
      paddingLeft: 10,
      justifyContent:'center',
      borderRadius: 15,
      width: width*0.9,
      height: 40,
      marginBottom: 20
    },
    title: {
      alignSelf:'center',
      alignContent:'center',
      padding:15,
      marginBottom:10,
      fontSize:28,
      color:'#FFF'
    },
    
  });

export default changePwdForm;