import React from "react"
import {View, StyleSheet,Text} from "react-native"
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

const tab = createBottomTabNavigator();

const signUpScreen = () =>{
    return(
        <View style={styles.container}>
            <Text>signUpScreen screen</Text>
        </View>
    )
}


const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#252c4a',
      alignItems: 'center',
      justifyContent: 'center',
    },
    
  });

export default signUpScreen;