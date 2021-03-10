import React, {useState,useEffect} from 'react' 
import {StyleSheet, Text, View,FlatList} from 'react-native'
import {firebase} from '../../Firebase'
import Button from '../button/button'
import fetchAnimeList from '../../api'
import CardV from '../cards/cardV'




const homeScreen =()=>{

    const [data, setData] = useState([]);

    useEffect(() => {
        getAnimes();
    }, [])

    
    const getAnimes = async ()=>{
        const animeList = await fetchAnimeList();
        setData(animeList);
        if(!animeList.length){
            console.log("error")
        }
    }
    
    
    
    return(
        <View style={styles.container}>
                <Text style={styles.text}>Home</Text>
                
                {data!=undefined?(<FlatList
                            ListEmptyComponent={<Text>No hay Libros disponibles!</Text>}
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
                            keyExtractor={(items,index) => index.toString()}
                />):(null)}
        </View>
    )
}

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
})

export default homeScreen;