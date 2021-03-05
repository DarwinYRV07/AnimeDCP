import React from "react"
import {View, StyleSheet,Text} from "react-native"
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

const tab = createBottomTabNavigator();

const changePwdScreen = () =>{
    return(
        <View style={styles.container}>
            <Text>changePwdScreen screen</Text>
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

export default changePwdScreen;