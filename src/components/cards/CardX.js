import React from "react"
import {View, StyleSheet,Text,Dimensions, TouchableOpacity } from "react-native"
import {Image,Button} from 'react-native-elements'
import Icon from "react-native-vector-icons/FontAwesome5";


const{width,height}=Dimensions.get("screen");

const CardX = ({url, name, callback, eliminar}) =>{
    return(
        <View style={styles.container}>
            <TouchableOpacity style={styles.bloqueTitle} onPress={callback}>
                <View style={{flexDirection:"row"}}>
                    <Image style={styles.portada} source={{uri:url}}/>
                    <Text style={styles.titulo}>{name}</Text>
                </View>
            </TouchableOpacity>
            <View style={styles.bloqueButton}>
                <Button
                    icon={
                        <Icon
                        name="minus-circle"
                        size={30}
                        color="#8C3235"
                        />
                    }
                    type="clear"
                    buttonStyle={styles.buttons}
                    onPress={eliminar}
                />
            </View>
        </View>
    )
}


const styles = StyleSheet.create({
    container:{
        backgroundColor: '#BFC9CE',
        flexDirection:"row",
        margin:8,
        width:width * 0.90,
        padding:10,
        borderRadius:15,
        shadowColor: "#000",
        shadowOffset: {
        width: 2,
        height: 6,
      },
      shadowOpacity: 0.39,
      shadowRadius: 8.30,
      elevation: 13,
    },
    portada:{
        borderRadius:15,
        marginBottom:5,
        width:60,
        height:60,
        resizeMode:"contain",
        paddingRight:20,
        marginLeft: 0,
        marginRight:25
    },
    titulo:{
      fontSize:15,
      fontWeight: "bold",
      color:"#344A53",
      alignSelf:"center",
      textAlign:"center",
      width:width*0.45
    },

    buttons:{
        backgroundColor:"#BFC9CE",
        margin:3,
        borderRadius:30,
        padding:11,
    },
    bloqueTitle:{
        width:width * 0.7,
        alignItems:"center",
        justifyContent:"center",
    },
    bloqueButton:{
        width:60,
        marginRight:0,
    },

  });

export default CardX;