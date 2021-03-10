import React from 'react'; 
import {Text, Image} from "react-native-elements";
import {StyleSheet, View, Dimensions} from 'react-native'

const{width,height}=Dimensions.get("screen");


const animeScreen =()=>{
    return(
        <View style={styles.container}>
            {/*<View style={{backgroundColor:"gray", width:width * 100, height: height * 0.25,}}>
                <Text>hOL</Text>
                </View>*/}
                <View style={styles.ContenedorTituloImg}>
                    <Image source={{uri: require("../../assets/imgPrueba.jpg") }} style={styles.imagen}/>
                    <Text h5 style={styles.titlestyle}>TITULO</Text>
                </View>
                    <View style={styles.ItemShow}>
                        <View style={styles.ItemGener}>
                            <Text style={styles.ItemBorder}>Temporada</Text>
                            <Text style={styles.ItemBorder} >puntuacion</Text>
                            <Text style={styles.ItemBorder}>TIpo</Text>
                        </View>
                        <View style={styles.ItemGener}>
                            <Text style={styles.ItemBorder}>Genero1</Text>
                            <Text style={styles.ItemBorder} >Genero1</Text>
                            <Text style={styles.ItemBorder}>Genero1</Text>
                            <Text style={styles.ItemBorder}>Genero1</Text>
                        </View>
                        <View style={styles.ItemCap}>
                            <Text>Total Capitulos</Text>
                        </View>
                        <View style={styles.ItemDescription}>
                            <Text>Descripcion</Text>
                        </View>
                    </View>
            
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
      titlestyle:{
          marginTop:10,
          fontSize:15,
          padding:3,
          color:"white"
      },
    text: {
        color:'white',
        marginLeft: 15,
        marginTop:10,
        marginBottom:10,
        fontSize:20,
        textAlign:'left',
        width: width*0.9
      },
      ContenedorTituloImg:{
        //backgroundColor:"yellow",
        color:"white",  
        justifyContent:"center",
        alignItems:"center"
        //position:"relative"
      },
      ItemGener:{
          justifyContent:"center",
          flexDirection:"row"
      },
      ItemCap:{
          justifyContent:"center",
          alignItems:"center",
      },
      ItemBorder:{
          marginTop:6,
          borderWidth:1,
          borderColor:"black",
          margin:4,
          padding:3,
          borderRadius:7,
      },
      ItemDescription:{
          margin:10,
          height:"auto",
          backgroundColor:"Red",
          padding:10,
      },
      ItemShow:{
          marginTop:10,
          borderRadius:15,
          shadowColor: '#000',
          shadowOffset: { width: 1, height: 5 },
          shadowOpacity: 0.7,
          shadowRadius: 10,
          elevation: 3,
          margin:1,
          backgroundColor:"white",
          width: width * 0.90,
      },
      imagen:{
          width:120,
          height:150,
          marginTop:20,
          //marginTop:-30,
          borderRadius:15,
          
          //position:"absolute"
      },

})

export default animeScreen;