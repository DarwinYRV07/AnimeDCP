import React from 'react';
import { StyleSheet, Text, View, Dimensions,TouchableOpacity,ImageBackground } from 'react-native';
import Logo from "../shared/Logo";
import Alert from "../shared/Alert"; 
import SignInForm from "../Forms/signInForm";

const { width } = Dimensions.get("screen");

const signInScreen = ({navigation}) =>{
    return(
        <View style={styles.container}>
        <ImageBackground source={require("../../../assets/background.png")} style={styles.image}> 
            <Logo/>
            <SignInForm navigation={navigation}/>
            
            <TouchableOpacity onPress={()=>{navigation.navigate("RestorePwd")}}>
                <Text style={styles.textPwd}>Forgot your password?</Text>
            </TouchableOpacity>
           
            <TouchableOpacity onPress={()=>{navigation.navigate("SignUp")}}>
                <Text style={styles.textForget} >Don't have account? Sign Up</Text>
            </TouchableOpacity>      
            </ImageBackground>      
            
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
    image:{
      flex: 1,
      resizeMode:"cover",
      justifyContent: "center",
      width:width*1,
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