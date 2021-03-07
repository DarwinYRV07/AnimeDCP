import React from 'react';
import { View, StyleSheet, Text, TextInput, Dimensions } from "react-native"
import {} from 'react-native-elements'
import Button from "../button/Button";
import Logo from "../shared/Logo"

const {width} = Dimensions.get("screen");

const changePwdForm = ({navigation}) =>{
    return(
        <View style={styles.container}>
            <Logo/>
            <Text style={styles.title}>Change password</Text>
            <Text style={styles.text}>Current password</Text>
            <TextInput style={styles.input} placeholder="Enter current password"/>
            <Text style={styles.text}>New password</Text>
            <TextInput style={styles.input} placeholder="Enter new password"/>
            <Text style={styles.text}>Confirm password</Text>
            <TextInput style={styles.input} placeholder="Confirm password"/>
            <Button title="SAVE"/>
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