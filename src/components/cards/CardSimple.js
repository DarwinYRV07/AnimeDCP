import React from "react"
import {View, StyleSheet,Text,Dimensions, TouchableOpacity } from "react-native"
import {Button} from 'react-native-elements'
import Icon from "react-native-vector-icons/FontAwesome5";


const{width,height}=Dimensions.get("screen");

const CardSimple = ({name, callbacktitulo ,editar ,eliminar }) =>{
    return(
        <View style={styles.container}>
            <TouchableOpacity style={styles.bloqueTitle} onPress={callbacktitulo}>
                <View >
                    <Text style={styles.titulo}>{name}</Text>
                </View>
            </TouchableOpacity>
            <View style={styles.bloqueButton}>
                <Button
                    icon={
                        <Icon
                        name="pen-square"
                        size={30}
                        color="#003E57"
                        />
                    }
                    type="clear"
                    buttonStyle={styles.buttons}
                    onPress={editar}
                />

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
    titulo:{
      fontSize:17,
      fontWeight: "bold",
      color:"#344A53",
      alignSelf:"center",
      textAlign:"left"
    },

    buttons:{
        backgroundColor:"#BFC9CE",
        margin:3,
        borderRadius:30,
        padding:11,
    },
    bloqueTitle:{
        width:width * 0.55,
        alignItems:"center",
        justifyContent:"center",
    },
    bloqueButton:{
        width:width * 0.30,
        flexDirection:"row",
        //marginLeft:1,
    },

  });

export default CardSimple;