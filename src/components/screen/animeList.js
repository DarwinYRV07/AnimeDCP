import React, {useState,useEffect,useContext} from 'react' 
import {StyleSheet, Text, View,FlatList,ImageBackground,StatusBar} from 'react-native'
import {fetchAnimeList} from '../../api'
import CardV from '../../components/cards/CardV'
import { Dimensions } from 'react-native'
import {Context as ListAnimeContext} from '../../providers/listAnimeContext'
import {Context as AuthContext} from '../../providers/AuthContext'
import CardX from '../cards/CardX'

const {width, height} = Dimensions.get("screen");

const animeList =({navigation,route})=>{
    const {idList} = route.params;
    const {state,getAnimeList} = useContext(ListAnimeContext)
    const {state:authstate} = useContext(AuthContext)
    const [data, setData] = useState([]);

    useEffect(() => {
        getAnimeList(idList);
    }, [idList])

    useEffect(() => {
        if(Array.isArray(state.animes)){
            setData(state.animes);
        }
        //cconsole.log(state.animes)
        
    }, [state])

    useEffect(() => {
        console.log(data) 
    }, [state])

    const viewAnime = (id) =>{
        navigation.navigate("Anime", {idAnime:id})
    }
    
    
    
    return(
        <View style={styles.container}>
              <StatusBar
                translucent
                animated={true}
                backgroundColor={"transparent"}
                barStyle={"default"}  
                />
            <ImageBackground source={require("../../../assets/background.jpg")} style={styles.image}> 
                <View style={styles.header}><Text style={styles.text}>Home</Text></View>    
                
                {data!=undefined?(<FlatList 
                            ListEmptyComponent={<Text>No hay animes disponibles!</Text>}
                            data={data}
                            key={({item})=>{item.mal_id}}
                            horizontal={false}
                            renderItem={({item}) => {
                            return (
                                <CardX
                                    url ={item.url}
                                    name ={item.title}
                                    //callback ={}
                                    //eliminar ={}
                                />
                            )  
                             
                            }}
                            keyExtractor={(item, index) => index.toString()}
                />):(null)}
            </ImageBackground>
    
        </View>
    )
}
//SIN TERMINAR LOS ESTILOS PARA UN HEADER COMPONENTE
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems:"center"
      },
      image:{
        flex: 1,
        resizeMode:"cover",
        justifyContent: "center",
        width:width*1,
        alignItems:"center"
      },
      text:{
        color:"#BFC9CE",
        fontSize:30,
        marginTop:10,
        marginBottom:15,
        position:"relative"
    },
    header:{
        marginTop:45,
        marginBottom:0,
        position:"relative",
        borderRadius:5,
        backgroundColor: '#2F353A',
        alignItems:"center",
        justifyContent:"center",
        flexDirection:"row",
        shadowColor: "#000",
        width:width*0.95,
        shadowOffset: {
            width: 0,
            height: 4,
        }
    },

})

export default animeList;