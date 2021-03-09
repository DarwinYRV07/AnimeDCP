import React from 'react' 
import { StyleSheet, View, Text, Dimensions } from 'react-native'
import CardV from '../cards/cardV'

const{width,height}=Dimensions.get("screen");

const myListScreen =()=>{
    return(
        <View style={styles.container}>
            <Text style={styles.text}>
                My list anime
            </Text>
            <CardV/>
            <CardV/>
            <CardV/>
        </View>
        
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#252c4a',
        alignItems: 'center',
        justifyContent: 'flex-start',  
      },
    text: {
        color:'#22DEFA',
        marginLeft: 15,
        marginTop:10,
        marginBottom:10,
        fontSize:20,
        textAlign:'left',
        width: width*0.9
      },
})

export default myListScreen;