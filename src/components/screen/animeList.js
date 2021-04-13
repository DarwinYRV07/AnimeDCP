import React, {useState,useEffect,useContext} from 'react' 
import {StyleSheet, Text, View,FlatList,ImageBackground,StatusBar,Dimensions} from 'react-native'
import {Context as ListAnimeContext} from '../../providers/listAnimeContext'
import {Context as AuthContext} from '../../providers/AuthContext'
import CardX from '../cards/CardX'
import {Image,Button} from 'react-native-elements'
import Icon from "react-native-vector-icons/FontAwesome5";

const {width, height} = Dimensions.get("screen");

const animeList =({navigation,route})=>{
    const {idList,name} = route.params;
    const {state,getAnimeList,delAnime} = useContext(ListAnimeContext)
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
    //ELIMINAR ANIME
    const handlerDelAnime=(docIdent)=>{
        delAnime(docIdent);
        getAnimeList(idList);
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
                <View style={styles.header}>
                    <Text style={{marginRight:width*0.24}}>
                        <Button
                            icon={
                                <Icon
                                name="arrow-left"
                                size={20}
                                color="#BFC9CE"
                                />
                            }
                            type="clear"
                            buttonStyle={styles.buttons}
                            onPress={()=>{navigation.goBack()}}/////ARREGLAR
                        />
                    </Text>
                    <Text style={{textAlign:"center"}}>
                        <Text style={styles.text}>{name}</Text>
                    </Text>
                </View>    
                
                {data!=undefined?(<FlatList 
                            ListEmptyComponent={<Text style={{color:"#fff"}}>No hay animes disponibles!</Text>}
                            data={data}
                            key={({item})=>{item.docIdent}}
                            horizontal={false}
                            renderItem={({item}) => {
                            return (
                                <CardX
                                    url ={item.url}
                                    name ={item.title}
                                    //callback ={}
                                    eliminar ={()=>{handlerDelAnime(item.docIdent)}}
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
        height:70,
        position:"relative",
        alignItems:"center",
        borderRadius:5,
        backgroundColor: '#2F353A',
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