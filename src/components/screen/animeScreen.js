import React, { useEffect, useState,useContext,useRef } from 'react'; 
import {Text, Image,Button} from "react-native-elements";
import {
    StyleSheet, 
    View, 
    Dimensions,
    FlatList, 
    ScrollView,
    Modal,
    Pressable,
    TouchableOpacity,
    
} from 'react-native'
import {FAB} from "react-native-paper"
import Score from "../shared/Score";
import Gender from "../shared/Gender";
import Type from "../shared/Type";
import Airing from "../shared/Airing";
import {fetchAnimeEs, fetchAnimeGenero } from "../../api/index";
import {Context as ListAnimeContext} from '../../providers/listAnimeContext'
import {Context as AuthContext} from '../../providers/AuthContext'
import WebView from "react-native-webview"


const{width,height}=Dimensions.get("screen");

/*const genres =(generos)=>{
    const datageners = generos.map((genero)=>{
        return genero.name;
        console.log(genero.name);
    })
};*/

const animeScreen =({navigation, route})=>{
    const {idAnime,fab} = route.params;

    const {createList,state,getLists,addAnime} = useContext(ListAnimeContext)
    const {state:authstate} = useContext(AuthContext)

    const [animeInfo,setAnimeInfo] = useState([]);
    const [genero,setGenero] = useState([]);
    const [relacionado, setRelacionado] = useState([]);
    const [error,setError] = useState(false);
    const [modalVisible, setModalVisible] = useState(false);
    const [data,setData] = useState([]);

    //video
    const video = useRef(null);
    const [status, setStatus] = useState({});
    console.log()

    useEffect(() => {
        handlerstart();
        getLists(authstate.user.id);
       
    }, [idAnime])


    useEffect(() => {
        setData(state.list)
    }, [state])
    
    const handlerstart =()=>{
        const getAnimesInfo = async()=>{
            const newAnimeInfo = await fetchAnimeEs(idAnime);
            if (!newAnimeInfo) setError(true); 
            setAnimeInfo(newAnimeInfo);
        }
        const getgeneros = async () => {
            const newgeneros = await fetchAnimeGenero(idAnime);
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
    
    const handlerAddAnime =(idList)=>{
        addAnime(
            animeInfo.title,
            animeInfo.image_url,
            animeInfo.score,
            idList,
            idAnime,
            animeInfo.airing
        );
        setModalVisible(!modalVisible);
    }

    //QUITAR Y PROBAR SI ES NECESARIO YA QUE HAY OTRO HANDLER ARRIBA
    useEffect(()=>{
        handlerstart();
    },[]);

   //console.log(animeInfo.related.Sequel);
   const caratu = animeInfo.image_url;
   //console.log(relacionado[0].mal_id);

    return(
        
            <View style={styles.container}>
            <Modal
                    animationType="slide"
                    transparent={true}
                    visible={modalVisible}
                    onRequestClose={() => {
                    setModalVisible(!modalVisible);
                    }}
                >
                    <View  transparent={true} style={styles.containermdl}>
                    <View style={styles.modalView}>
                        <Text style={styles.modalText}>Add to List</Text>
                        {data!=undefined?(<FlatList style={styles.flat}
                            ListEmptyComponent={<Text style={{color:"#fff"}}>No tienes listas para guardar animes!</Text>}
                            data={data}
                            key={({item})=>{item.id}}
                            horizontal={false}
                            renderItem={({item}) => {
                            return (
                                <TouchableOpacity onPress={()=>{handlerAddAnime(item.id)}} > 
                                <View style={styles.listas}>
                                     <Text style={styles.textLista}>{item.name}</Text>        
                                </View>
                                </TouchableOpacity>
                            )  
                             
                            }}
                            keyExtractor={(item, index) => index.toString()}
                        />):(null)}
  
                        <Pressable
                        style={[styles.button, styles.buttonClose]}
                        onPress={() => setModalVisible(!modalVisible)}
                        >
                        <Text style={styles.textStyle}>Cancelar</Text>
                        </Pressable>
                        


                        
                    </View>
                    </View>
                </Modal>


            <ScrollView showsVerticalScrollIndicator={false}>
                <View style={{marginBottom:30,marginTop:20,position:"relative",justifyContent:"center",alignItems:"center"}}>
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
                    
                    <View style={styles.ItemShowVideo}>
                    <Text style={{textAlign:'center',color:"#000"}}>TRAILER</Text>
                            <WebView
                                style={ styles.WebViewContainer }
                                javaScriptEnabled={true}
                                domStorageEnabled={true}
                                source={{uri: animeInfo.trailer_url?animeInfo.trailer_url:'https://www.youtube.com/embed/8krW_NGyLjQ'}}
                            />
                            
                    </View>
                    <View style={styles.ItemShow}>
                        <View style={styles.ItemDescription}>
                            <Text>Description:</Text>
                            <Text>{animeInfo.synopsis}</Text>
                        </View>
                    </View>

                    
                </View>
                </ScrollView>
                {!fab?(<FAB
                    icon="plus"
                    style={styles.fab}
                    onPress={() => {
                        setModalVisible(!modalVisible);
                    }}
                />
                ):(<FAB
                    icon="minus"
                    style={styles.fabDel}
                    onPress={() => {
                        setModalVisible();
                    }}
                />)}
            </View>
        
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#2F353A',
        alignItems: 'center',
        //justifyContent: 'flex-start',

      },containermdl:{
        flex: 1,
        // backgroundColor: '#2F353A',
        alignItems: 'center',
        justifyContent: 'center',
        width:width*0.8,
        height:height*0.7
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
    containermdl:{
        flex: 1,
        // backgroundColor: '#2F353A',
        alignItems: 'center',
        justifyContent: 'center',
      },
      text: {
          color:'#22DEFA',
          marginLeft: 15,
          marginTop:10,
          marginBottom:10,
          fontSize:20,
          textAlign:'center',
          width: width*0.9,
          marginTop: 40,
          marginBottom: 10
      },
      modalView: {
          backgroundColor: "#2F353A",
          borderRadius: 20,
          height:height*0.6,
          padding: 35,
          alignItems: "center",
          justifyContent:"center",
          shadowColor: "#000",
          shadowOffset: {
            width: 0,
            height: 2
          },
          shadowOpacity: 0.25,
          shadowRadius: 4,
          elevation: 4
        },
        button: {
          borderRadius: 20,
          padding: 10,
          elevation: 2,
          marginTop:10
        },
          buttonClose: {
            backgroundColor: "#8C3235",
            width:width*0.4
        },
        textStyle: {
          color: "white",
          fontWeight: "bold",
          textAlign: "center"
        },
        modalText: {
          color:'#22DEFA',
          marginBottom: 15,
          textAlign: "center",
          fontSize:15
        },
        fab: {
          position: "absolute",
          margin: 20,
          right: 0,
          bottom: 15,
          backgroundColor:"#22DEFA"
        },
        fabDel: {
            position: "absolute",
            margin: 20,
            right: 0,
            bottom: 15,
            backgroundColor:"#8C3235"
        },
        input:{
            backgroundColor:"#fff",
            color:"#000",
            textAlign:"left",
            paddingLeft:10,
            justifyContent:"center",
            borderRadius:15,
            width: width*0.5,
            height: 40,
            marginBottom:10
        },
        listas:{
          flex:1,
          backgroundColor:"#BFC9CE",
          width:width*0.8,
          height:50,
          borderRadius:20,
          margin:8,
          alignItems:'center',
          justifyContent:'center',
        },
        textLista:{
          color:"#2F353A",
          fontSize:20
        },
        ItemShowVideo:{
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
            height: height*0.3,
            paddingBottom:0
        }

})

export default animeScreen;