import React, { useState, useEffect } from 'react' 
import { StyleSheet, View, Text, Dimensions, Button, FlatList,TextInput,ImageBackground } from 'react-native'
import {fetchAnimeSearch} from '../../api'
import CardV from '../cards/CardV'

const{width,height}=Dimensions.get("screen");

const searchScreen =({navigation})=>{
    const [animename, setAnimeName] = useState("");
    const [animeNameError, setAnimeNameError] = useState(false);
    const [data, setData] = useState([]);
    const [search, setSearch] = useState(false);

    useEffect(() => {
        handleSearchAnimes();
        console.log(data);
        console.log(animename);
    }, [search])
    
    const handleSearchAnimes = async ()=>{
        const animeList = await fetchAnimeSearch(animename);
        setData(animeList);
    }

    const handleVerify = (input) => {
        if (input === "animename") {
          if (!animename) {
              setAnimeNameError(true);
          }
          else {
              setAnimeNameError(false);
          }
        }
    };

    const viewAnime = (id) =>{
        navigation.navigate("Anime", {idAnime:id})
    }

    return(
        <View style={styles.container}>
        <ImageBackground source={require("../../../assets/background2.png")} style={styles.image}> 
            <Text style={styles.text}>
                Find your favorite anime.
            </Text>
            <View style={styles.searchbar}>
                <TextInput
                    style={styles.input} 
                    placeholder={"Enter anime name"}
                    value={animename}
                    onChangeText={setAnimeName}
                    onBlur={() => {handleVerify("animename");}}errorMessage={ animeNameError? "Please enter the name.": ""}>
                </TextInput>
                <Button title="Search" onPress={()=>{
                    setData([]);
                    setSearch(!search);
                    console.log(search);
                }}/>
            </View>
            <View style={styles.container}> 
                
                {data!=undefined?(<FlatList
                            ListEmptyComponent={<Text style={{color:"#fff"}}>The requested anime was not found!</Text>}
                            data={data}
                            key={({item}) => item.mal_id}
                            horizontal={false}
                            renderItem={({item}) => {
                            return (
                                <View>
                                     <CardV
                                        url={item.image_url}
                                        name={item.title}
                                        //id={item.mal_id}
                                        punt={item.score}
                                        date={item.start_date}
                                        callback={()=>{viewAnime(item.mal_id)}}
                                     />
                                </View>
                            )   
                            }}
                            keyExtractor={(item, index) => index.toString()}
                            
                />):(null)}
            </View>
        </ImageBackground>
        </View>
        
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'flex-start',
    },
    searchbar: {
        borderRadius:5,
        marginTop:10,
        alignItems:"center",
        justifyContent:"center",
        flexDirection:"row"
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
      input:{
        backgroundColor:"#fff",
        color:"#000",
        textAlign:"left",
        paddingLeft:10,
        justifyContent:"center",
        borderRadius:15,
        width: width*0.7,
        height: 40,
        marginBottom:5,
        marginRight: 20
    },
    image:{
      flex: 1,
      resizeMode:"cover",
      justifyContent: "center",
      width:width*1,
      alignItems:"center"
    },
})

export default searchScreen;