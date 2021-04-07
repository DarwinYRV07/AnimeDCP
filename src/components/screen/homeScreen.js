import React, {useState,useEffect} from 'react' 
import {StyleSheet, Text, View,FlatList,TouchableOpacity} from 'react-native'
import {firebase} from '../../Firebase'
import Button from "../button/button"
import {fetchAnimeList} from '../../api'
import CardV from '../../components/cards/CardV'





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
                <View style={styles.headerLeft}><Text style={styles.text}>Home</Text></View>    
                
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
  
        </View>
    )
}
//SIN TERMINAR LOS ESTILOS PARA UN HEADER COMPONENTE
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#2F353A',
        justifyContent: 'center',
        alignItems:"center"
      },
      text:{
        color:"white",
        fontSize:30,
        marginTop:20,
        marginBottom:15,
    },
    header:{
        flexDirection:"row",
    },
    headerText:{
        fontSize:20,
        color:"#fff",    
        
    },
    headerLeft:{
        
    },
    headerRight:{
        textAlign:"right"
    }
})

export default homeScreen;