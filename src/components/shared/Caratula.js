import React from 'react';
import {Dimensions, StyleSheet, View} from "react-native";
import {Image} from 'react-native-elements';

const {width,height} = Dimensions.get("screen");

const Caratura = (img) =>{
    console.log("Imagennnnn"+img);
    return(
     <View>
         <Image source={{ uri:img }} style={styles.imagen} />
     </View>
    )
}
const styles = StyleSheet.create({
    imagen:{
        width:120,
        height:150,
        marginTop:20,
        //marginTop:-30,
        borderRadius:15,
        //position:"absolute"
    },
});

export default Caratura;