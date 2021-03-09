import React from 'react';
import { StyleSheet, Text, View, Dimensions,TouchableOpacity } from 'react-native';

import Logo from "../shared/Logo";
import Alert from "../shared/Alert"; 
import SignInForm from "../Forms/signInForm";

const { width } = Dimensions.get("screen");

const signInScreen = ({navigation, route}) =>{
    const { userCreated } = route.params;
    return(
        <View style={styles.container}>
            <Logo/>
            { userCreated ?( <Alert type="success" title= "User Created!! You can now sing in :)!!"/>):null}
            <SignInForm/>
            
            <TouchableOpacity onPress={()=>{navigation.navigate("ChangePwd")}}>
                <Text style={styles.textPwd}>Forgot your password?</Text>
            </TouchableOpacity>
           
            <TouchableOpacity onPress={()=>{navigation.navigate("SignUp")}}>
                <Text style={styles.textForget} >Don't have account? Sign Up</Text>
            </TouchableOpacity>    
            <TouchableOpacity onPress={()=>{navigation.navigate("BottonTabs")}}>
                <Text> GO MENU</Text>
            </TouchableOpacity>   
              
            
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#2F353A',
      justifyContent: 'center',
      alignItems:"center"
    },
    logo:{
        width: 200, 
        height: 200,
        margin:5,
    },
    
    textForget:{
        color: "white",
        fontSize:15,
        textAlign:"center",
        width:width*0.9,
        marginBottom:15,
    },
    textPwd:{
        color: "white",
        fontSize:15,
        textAlign:"right",
        width:width*0.9,
        marginBottom:15,
    },
    button: {
        alignSelf: "center",
        padding: 15,
        borderRadius: 30,
        marginBottom: 10,
        width: width * 0.8,
      },
    
  });

export default signInScreen;