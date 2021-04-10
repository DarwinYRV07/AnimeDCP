import React, { useState, useEffect } from 'react' 
import { Input } from "react-native-elements";
import { StyleSheet, View, Text, Dimensions, Button, FlatList,TextInput } from 'react-native'
import {fetchAnimeSearch} from '../../api'
import CardV from '../cards/CardV'

const{width,height}=Dimensions.get("screen");

const myListScreen =()=>{
    return(
        <View style={styles.container}>
            <Text style={styles.text}>
                My list screen
            </Text>
        </View>
        
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#2F353A',
        alignItems: 'center',
        justifyContent: 'flex-start',
    },
    text: {
        color:'#22DEFA',
        marginLeft: 15,
        marginTop:10,
        marginBottom:10,
        fontSize:20,
        textAlign:'center',
        width: width*0.9,
        marginTop: 40,
        marginBottom: 10
      }
})

export default myListScreen;