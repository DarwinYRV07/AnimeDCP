import React from "react"
import {View, StyleSheet,Text,Dimensions} from "react-native"
import {Image,Button,Icon} from 'react-native-elements'


const{width,height}=Dimensions.get("screen");

const CardV = ({url,name,id,punt,date,btn}) =>{
    return(
      <View style={styles.cardRow}>
        {/* <View style={styles.left}> */}
          <Image style={styles.portada} source={{uri:url}}/>  
        {/* </View> */}
        
        <View style = {styles.right} >
          <Text style={styles.titulo}>{name}</Text>
          <Text style={styles.fecha}>Start: {date}</Text>
          <Text style={styles.fecha}>Puntuacion: {punt}</Text>
        </View>
        {btn?
          (<Button
            icon={
              <Icon
                name="delete"
                size={20}
                color="white"
              />
            }
            iconTop
            type="clear"
          />):null
        }
        
      </View>
      
    )
}


const styles = StyleSheet.create({
    portada:{
      marginBottom:5,
      width:60,
      height:60,
      resizeMode:"contain",
      paddingRight:20
    },
    titulo:{
      fontSize:15,
      color:"#ffff",
      alignSelf:"center"
    },
    fecha:{
      fontSize:12,
      color:"#ff3f"
    },cardRow:{
        borderRadius:5,
        marginTop:10,
        backgroundColor: '#413F4F',
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