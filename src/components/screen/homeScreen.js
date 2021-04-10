import React, {useState,useEffect} from 'react' 
import {StyleSheet, Text, View,FlatList,ImageBackground} from 'react-native'
import {firebase} from '../../Firebase'
import Button from "../button/button"
import {fetchAnimeList} from '../../api'
import CardV from '../../components/cards/CardV'
import { Dimensions } from 'react-native'



const {width, height} = Dimensions.get("screen");


const homeScreen =()=>{

    const [data, setData] = useState([]);

    useEffect(() => {
        getAnimes();
    }, [])

    
    const getAnimes = async ()=>{
        try {
            const animeList = await fetchAnimeList();
            setData(animeList);
            if(!animeList.length){
                console.log("error")
            }
        } catch (error) {
            console.log(error)
        }
    }
    
    
    
    return(
        <View style={styles.container}>
            <ImageBackground source={require("../../../assets/background.jpg")} style={styles.image}> 
                <View style={styles.header}><Text style={styles.text}>Home</Text></View>    
                
                {data!=undefined?(<FlatList 
                            ListEmptyComponent={<Text>No hay animes disponibles!</Text>}
                            data={data}
                            key={({item}) => item.mal_id}
                            horizontal={false}
                            renderItem={({item}) => {
                            return (
                                <View>
                                     <CardV
                                        url={item.image_url}
                                        name={item.title}
                                        id={item.mal_id}
                                        punt={item.score}
                                        date={item.start_date}
                                        btn={false}
                                     />
                                </View>
                            )   
                            }}
                            
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

export default homeScreen;