import React, { useState} from 'react';
import { View, StyleSheet, Text, Dimensions, TextInput } from "react-native"
import { firebase } from "../../Firebase/index";
import Button from "../button/button";
import Logo from "../shared/Logo"


const {width} = Dimensions.get("screen");

const changePwdForm = ({navigation}) =>{
  
  const [current, setCurrent] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  
  const [currentError, setCurrentError] = useState(false);
  const [newPasswordError, setNewPasswordError] = useState(false);
  const [confirmPasswordError, setConfirmPasswordError] = useState(false);
  const [error, setError] = useState(false);

  const handleVerify = (input) => {
    if(input === 'current'){
      if(!current){
        setCurrentError(true);
      }else
        setCurrentError(false);
    } else if (input === "newPassword") {
      if (!newPassword) setNewPasswordError(true);
      else if (newPassword.length < 6) setNewPasswordError(true);
      else setNewPasswordError(false);
    } else if (input === "confirmPassword") {
      if (!confirmPassword) setConfirmPasswordError(true);
      else if (confirmPassword !== newPassword) setConfirmPasswordError(true);
      else setConfirmPasswordError(false);
    }
  };

  const reauthenticatePsw = (current) =>{
    const user = firebase.auth().currentUser;
    console.log(user);
    const cred = firebase.auth.EmailAuthProvider.credential(user.email,current);
    return user.reauthenticateWithCredential(cred);
  };

  const changePassword = (currentPassword, newPassword) => { 
    reauthenticatePsw (currentPassword)
    .then (() => { 
      const user = firebase.auth(). currentUser; 
      user.updatePassword (newPassword). then (() => { 
        console.log ("¡Contraseña actualizada!"); 
      }). catch ((error) => {console.log (error);}); 
    }). catch ((error) => {console.log (error);} ); 
  }

  const handlechangePwd = () => {   
    changePassword(current,newPassword);
  };



    return(
      
        <View style={styles.container}>
          <View style={{marginTop:25,justifyContent:"center",alignItems:"center"}}>
            {error ? <Alert title={error} type="error" /> : null}
            <Logo/>
            <Text style={styles.title}>Change password</Text>
            <Text style={styles.text}>Current password</Text>
            <TextInput style={styles.input} 
                placeholder="current"
                value={current}
                onChangeText={setCurrent}
                secureTextEntry
                autoCapitalize="none"
                onBlur={() => {
                  handleVerify("current");
                }}
                errorMessage={
                  currentError ? "Please enter the password" : ""
                }
            />

            <Text style={styles.text}>New password</Text>
            <TextInput style={styles.input} 
                placeholder="New Password"
                value={newPassword}
                onChangeText={setNewPassword}
                secureTextEntry
                autoCapitalize="none"
                onBlur={() => {
                  handleVerify("newPassword");
                }}
                errorMessage={
                  newPasswordError ? "Please enter the new password" : ""
                }
            />

            <Text style={styles.text}>Confirm password</Text>
            <TextInput style={styles.input} 
                placeholder="New Password"
                value={confirmPassword}
                onChangeText={setConfirmPassword}
                secureTextEntry
                autoCapitalize="none"
                onBlur={() => {
                  handleVerify("confirmPassword");
                }}
                errorMessage={
                  confirmPasswordError ? "Please check if it is the same password" : ""
                }
            />
            <Button title="SAVE"  callback={handlechangePwd}/>
          </View>
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