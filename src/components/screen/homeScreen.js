import React, {useState,useEffect} from 'react' 
import {StyleSheet, Text, View,FlatList} from 'react-native'




const homeScreen =()=>{

    const [data, setData] = useState([]);

    /*useEffect(() => {
        getAnimes();
    }, [])

    
    const getAnimes = async ()=>{
        const animeList = await fetchAnimeList();
        setData(animeList);
        if(!animeList.length){
            console.log("error")
        }
    }*/
    
    
    
    return(
        <View style={styles.container}>
            
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