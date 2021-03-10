import React from "react"
import {View, StyleSheet,Text,Dimensions} from "react-native"
import {Image,Button,Icon} from 'react-native-elements'


const{width,height}=Dimensions.get("screen");

const CardV = (url,name,id,punt,date) =>{
    return(
      <View style={styles.cardRow}>
        <Image style={styles.portada} source={{uri: require(url) }}/>
        <View >
          <Text style={styles.titulo}>{name}</Text>
          <Text style={styles.fecha}>Start: {date}</Text>
          <Text style={styles.fecha}>Puntuacion: {punt}</Text>
        </View>
        <Button
            icon={
              <Icon
                name="delete"
                size={20}
                color="white"
              />
            }
            iconTop
            type="clear"
          />
      </View>
      
    )
}


const styles = StyleSheet.create({
    portada:{
      marginBotton:5,
      width:60,
      height:60,
      resizeMode:"contain"
    },
    titulo:{
      fontSize:20,
      color:"#ffff",
      alignSelf:"stretch"
    },
    fecha:{
      fontSize:12,
      color:"#ff3f"
    },cardRow:{
        borderRadius:10,
        marginTop:10,
        backgroundColor: '#413F4F',
        alignItems: 'center',
        justifyContent:'center',
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
    }
    
  });

export default CardV;