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
            const newAnimeInfo = await fetchAnimeEs(879);
            if (!newAnimeInfo) setError(true); 
            setAnimeInfo(newAnimeInfo);
        }
        const getgeneros = async () => {
            const newgeneros = await fetchAnimeGenero(879);
            if(!newgeneros) setError(true);
            setGenero(newgeneros);
        };
        /*const getrelacionado = async () => {
            const newrelacionados = await ferchAnimeRelacionado(879);
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
   console.log(animeInfo.image_url);
   const caratu = animeInfo.image_url;
   console.log("AAAAAA "+ caratu);
   //console.log(relacionado[0].mal_id);

    return(
        <ScrollView>
            <View style={styles.container}>
                <View style={{marginBottom:30,marginTop:20,position:"relative",}}>
                    {/*<View style={{backgroundColor:"gray", width:width * 100, height: height * 0.25,}}>
                    <Text>hOL</Text>
                    </View>*/}
                    <View style={styles.ContenedorTituloImg}>
                        
                       {/* <View style={{marginBottom:170}}>
                            <View style={{position:"absolute"}}>
                                <Image source={{uri:caratu}} style={styles.imagen}/>
                            </View>
                        </View>*/}
                        <Image source={{uri:caratu}} style={styles.imagen}/>
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
                            <Text>Chapters: {animeInfo.episodes} </Text>
                            <Text>Duration: {animeInfo.duration} </Text>
                        </View>
                        
                    </View>
                    <View style={styles.ItemShow}>
                        <View style={styles.ItemDescription}>
                            <Text>Descripcion</Text>
                            <Text>{animeInfo.synopsis}</Text>
                        </View>
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
      },

      titlestyle:{
          textAlign:"center",
          marginTop:10,
          marginBottom:5,
          fontSize:18,
          padding:3,
          color:"#22DEFA",
          fontWeight:"bold"
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
          shadowOffset: { width: 2, height: 5 },
          shadowOpacity: 0.7,
          shadowRadius: 10,
          elevation: 3,
          margin:1,
          backgroundColor:"#BFC9CE",
          width: width * 0.90,
          paddingBottom:10
      },
      ItemTrailer:{
          padding:10,
      },
      imagen:{
        width:0.40 * width,
        height:0.30 * height,
        marginTop:20,
        borderRadius:15,
    },

})

export default animeScreen;