import React, { useEffect, useState } from 'react'; 
import {Text, Image} from "react-native-elements";
import {StyleSheet, View, Dimensions,FlatList, ScrollView} from 'react-native'
import Score from "../shared/Score";
import Gender from "../shared/Gender";
import Type from "../shared/Type";
import Airing from "../shared/Airing";
import {fetchAnimeEs, fetchAnimeGenero } from "../../api/index";
//import Video from "react-native-video";



const{width,height}=Dimensions.get("screen");

/*const genres =(generos)=>{
    const datageners = generos.map((genero)=>{
        return genero.name;
        console.log(genero.name);
    })
};*/

const animeScreen =(navigate)=>{
    //const [id] ;
    const [animeId,setAnimeId] = useState("");
    const [animeInfo,setAnimeInfo] = useState([]);
    const [genero,setGenero] = useState([]);
    const [relacionado, setRelacionado] = useState([]);
    const [error,setError] = useState(false);
    
    const handlerstart =()=>{
        const getAnimesInfo = async()=>{
            const newAnimeInfo = await fetchAnimeEs(7785);
            if (!newAnimeInfo) setError(true); 
            setAnimeInfo(newAnimeInfo);
        }
        const getgeneros = async () => {
            const newgeneros = await fetchAnimeGenero(7785);
            if(!newgeneros) setError(true);
            setGenero(newgeneros);
        };
        /*const getrelacionado = async () => {
            const newrelacionados = await ferchAnimeRelacionado(7785);
            if(!newrelacionados) setError(true);
            setRelacionado(newrelacionados);

        }*/
        getAnimesInfo();
        getgeneros();
        //getrelacionado();
    }
    

    useEffect(()=>{
        handlerstart();
    },[]);

   //console.log(animeInfo.related.Sequel);
   console.log(animeInfo.trailer_url);
   //console.log(relacionado[0].mal_id);

    return(
        <ScrollView>
            <View style={styles.container}>
            
                {/*<View style={{backgroundColor:"gray", width:width * 100, height: height * 0.25,}}>
                <Text>hOL</Text>
                </View>*/}
                <View style={styles.ContenedorTituloImg}>
                    <Image source={{uri: animeInfo.image_url }} style={styles.imagen}/>
                    <Text h5 style={styles.titlestyle}>{animeInfo.title}</Text>
                </View>

                <View style={styles.ItemShow}>
                    <View style={styles.ItemGener}>
                        <Score type={animeInfo.score} title={animeInfo.score}/>
                        <Type type={animeInfo.type} title={animeInfo.type}/>              
                        <Airing type={animeInfo.airing}/>
                    </View>

                    <View style={styles.ItemGener}>
                        {genero!=undefined?(<FlatList
                            ListEmptyComponent={<Text>No tiene Generos!!</Text>}
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
                    </View>
                        
                
                    <View style={styles.ItemCap}>
                        <Text>Total Capitulos: {animeInfo.episodes} </Text>
                        <Text>Duration: {animeInfo.duration} </Text>
                    </View>
                    
                </View>
                <View style={styles.ItemShow}>
                    <View style={styles.ItemDescription}>
                        <Text>Descripcion</Text>
                        <Text>{animeInfo.synopsis}</Text>
                    </View>
                </View>

                <View style={styles.ItemShow}>
                    <Text style={styles.text}>Trailer!</Text>
                    <View style={styles.ItemTrailer}>
                        {/*<Video 
                            source={{uri:animeInfo.trailer_url}}
                            style={{position: 'absolute',
                            top: 0,
                            left: 0,
                            bottom: 0,
                            right: 0,
                        }}
                        />*/}
                        
                       {/* {relacionado!=undefined?(<FlatList
                            ListEmptyComponent={<Text>No ahi continuacion del Anime!! </Text>}
                            data={relacionado}
                            key={({item}) => item.mal_id}
                            horizontal={true}
                            renderItem={({item}) => {
                            return (
                                <View>
                                    <Text>{item.name}</Text>
                                    <Type type={item.type} title={item.type}/>  
                                </View>
                            )   
                            }}   
                        />):(null)}*/}
                    </View>
                </View>
            </View>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#2F353A',
        alignItems: 'center',
        justifyContent: 'flex-start', 
        height: height * 0.100

      },
      titlestyle:{
          textAlign:"center",
          marginTop:10,
          fontSize:16,
          padding:3,
          color:"#fff"
      },
    text: {
        //color:'#fff',
        marginTop:9,
        fontSize:20,
        textAlign:'center',
        width: width*0.9
      },
      ContenedorTituloImg:{
        marginTop:35,
        //backgroundColor:"yellow",
        color:"#fff",  
        justifyContent:"center",
        alignItems:"center",
        textAlign:"center"
        
        //position:"relative"
      },
      ItemGener:{
          justifyContent:"center",
          flexDirection:"row",
          marginLeft:5,
          marginRight:5,
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
          //backgroundColor:"#f0f",
          padding:10,
      },
      ItemShow:{
          marginTop:5,
          borderRadius:12,
          shadowColor: '#000',
          shadowOffset: { width: 1, height: 5 },
          shadowOpacity: 0.7,
          shadowRadius: 10,
          elevation: 3,
          margin:1,
          backgroundColor:"#fff",
          width: width * 0.90,
          paddingBottom:10
      },
      imagen:{
          width:120,
          height:150,
          marginTop:20,
          //marginTop:-30,
          borderRadius:15,
          //position:"absolute"
      },
      ItemTrailer:{
          padding:10,
      },

})

export default animeScreen;