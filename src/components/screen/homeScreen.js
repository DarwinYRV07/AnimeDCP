import React, {useState,useEffect} from 'react' 
import {StyleSheet, Text, View,ScrollView} from 'react-native'
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
    
    
    const showAnimeList = ()=>{
        if(data!=undefined){
            const resultado = data.map(anime=>{
                console.log(anime.image_url)
                // <CardV
                //     url={anime.image_url}
                //     name={anime.title}
                //     id={anime.mal_id}
                //     punt={anime.score}
                //     date={anime.start_date}
                //  />
            })
            return(
                resultado
            )
        }
        return(0)
       
        
    };

    

    const handleLogOut=()=>{
        firebase.auth().signOut().catch(
          (error)=>{console.log(error)}
        );
        console.log("adios");
    }
    
    return(
        <View style={styles.container}>
                <Text>Home</Text>
                <Button title="logOut" 
                callback={handleLogOut}/>
                
            <ScrollView >
                {data!=undefined ?showAnimeList():null}
            </ScrollView>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#2F353A',
        justifyContent: 'center',
        alignItems:"center"
      }
})

export default homeScreen;