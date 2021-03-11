import React from "react"
import {View, StyleSheet,Text,Dimensions,TextInput,TouchableOpacity} from "react-native"
import SignUpForm from "../Forms/signUpForm";



const { width } = Dimensions.get("screen");


const signUpScreen = ({navigation}) =>{
  return(
    <View style={styles.container}>
        <SignUpForm navigation={navigation}/>
        <TouchableOpacity onPress={()=>{navigation.goBack()}}>
                <Text>You have account? Sign In</Text>
            </TouchableOpacity>        
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


export default signUpScreen;