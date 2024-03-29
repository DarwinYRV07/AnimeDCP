import React from "react"
import {View, StyleSheet,Text,Dimensions, TouchableOpacity } from "react-native"
import {Image} from 'react-native-elements'


const{width,height}=Dimensions.get("screen");

const CardV = ({url,name,id,punt,date,callback}) =>{
    return(
      <TouchableOpacity onPress={callback}>
        <View style={styles.cardRow}>
            <Image style={styles.portada} source={{uri:url}}/>    
          <View style = {styles.right} >
            <Text style={styles.titulo}>{name}</Text>
            <Text style={styles.fecha}>Start: {date}</Text>
            <Text style={styles.fecha}>Puntuacion: {punt}</Text>
          </View>
        </View>
      </TouchableOpacity>
      
    )
}

const styles = StyleSheet.create({
    portada:{
      borderRadius:15,
      marginBottom:5,
      width:60,
      height:60,
      resizeMode:"contain",
      paddingRight:20
    },
    titulo:{
      fontSize:15,
      fontWeight: "bold",
      textAlign: "center",
      color:"#344A53",
      alignSelf:"center"
    },
    fecha:{
      fontSize:12,
      color:"#344A53"
    },cardRow:{
        borderRadius:20,
        marginTop:10,
        backgroundColor: '#BFC9CE',
        alignItems:"center",
        justifyContent:"center",
        flexDirection:"row",
        shadowColor: "#000",
        shadowOffset: {
        width: 0,
        height: 6,
      },
      shadowOpacity: 0.39,
      shadowRadius: 8.30,
      width:width*0.9,
      height:height*0.1,
      elevation: 13,
    },
    left:{
      flex:1,
      alignItems:"center",
      justifyContent:"center",
      paddingLeft:-width*0.5
    },
    right:{
      flex:1,
      alignItems:"center",
      justifyContent:"center",
      
    }
    
  });

export default CardV;