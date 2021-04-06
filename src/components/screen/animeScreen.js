import React, { useEffect, useState } from 'react'; 
import {Text, Image} from "react-native-elements";
import {StyleSheet, View, Dimensions,FlatList} from 'react-native'
import Season from "../shared/Season";
import Gender from "../shared/Gender";
import Type from "../shared/Type";
import {fetchAnimeEs, fetchAnimeGenero} from "../../api/index";


const{width,height}=Dimensions.get("screen");

/*const genres =(generos)=>{
    const datageners = generos.map((genero)=>{
        return genero.name;
        console.log(genero.name);
    })
};*/

const animeScreen =()=>{
    const [animeid,setAnimeid] = useState([]);
    const [genero,setGenero] = useState([]);
    const [error,setError] = useState(false);
    
    const handlerstart =()=>{
        const getAnimesid = async()=>{
            const newAnimeid = await fetchAnimeEs(8756);
            if (!newAnimeid.length) setError(true); 
            setAnimeid(newAnimeid);
        }
        const getgeneros = async () => {
            const newgeneros = await fetchAnimeGenero(8756);
            if(!newgeneros.length) setError(true);
            setGenero(newgeneros);
        };
        getAnimesid();
        getgeneros();
    }
    

    useEffect(()=>{
        handlerstart();
    },[]);

   console.log(animeid);

    return(
        <View style={styles.container}>
            {/*<View style={{backgroundColor:"gray", width:width * 100, height: height * 0.25,}}>
                <Text>hOL</Text>
                </View>*/}
                <View style={styles.ContenedorTituloImg}>
                    <Image source={{uri: animeid.image_url }} style={styles.imagen}/>
                    <Text h5 style={styles.titlestyle}>{animeid.title}</Text>
                </View>
                    <View style={styles.ItemShow}>
                        <View style={styles.ItemGener}>
                            <Text>{animeid.score}</Text>
                            <Type type={animeid.type} title={animeid.type} />
                            <Season type="spring" title="Spring"/>
                            <Text>HOLAAA{animeid.season}</Text>
                            
                            
                        </View>
                            <View style={styles.ItemGener}>
                            {genero!=undefined?(<FlatList
                            ListEmptyComponent={<Text>No hay animes disponibles!</Text>}
                            data={genero}
                            key={({item}) => item}
                            horizontal={true}
                            renderItem={({item}) => {
                            return (
                                <View>
                                     <Gender title= {item} type={item}/>
                                </View>
                            )   
                            }}
                            
                            />):(null)}


                                {/*{genero.map((item)=>{
                                    return (
                                    <View>
                                        <Gender title= {item} type={item}/>
                                    </View>);

                                })}*/}
                            </View>
                        
                
                        <View style={styles.ItemCap}>
                            <Text>Total Capitulos: {animeid.episodes} </Text>
                            <Text>Duration: {animeid.duration} </Text>
                        </View>
                        <View style={styles.ItemDescription}>
                            <Text>Descripcion</Text>
                            <Text>{animeid.synopsis}</Text>
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
          color:"#fff"
      },
    text: {
        color:'#fff',
        marginLeft: 15,
        marginTop:10,
        marginBottom:10,
        fontSize:20,
        textAlign:'left',
        width: width*0.9
      },
      ContenedorTituloImg:{
        //backgroundColor:"yellow",
        color:"#fff",  
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
          borderColor:"#000",
          margin:4,
          padding:3,
          borderRadius:7,
      },
      ItemDescription:{
          margin:10,
          height:"auto",
          backgroundColor:"#f0f",
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
          backgroundColor:"#fff",
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