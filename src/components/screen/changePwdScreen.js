import React from "react"
import { } from "react-native-elements";
import { View, StyleSheet, Dimensions,TouchableOpacity, Text, ScrollView } from "react-native"
import ChangePwdForm from "../Forms/changePwdForm";

const {width} = Dimensions.get("screen");

const changePwdScreen = ({navigation}) =>{
    return(
        <View style={styles.container}>
          <ScrollView>
            <ChangePwdForm navigation={navigation}/>
            <TouchableOpacity onPress={()=>{navigation.goBack();}} >
              <Text style={{textAlign:"center", marginBottom: 25, color:"#FFF"}}>Cancel,go back</Text>
            </TouchableOpacity>
          </ScrollView>
        </View>
    )
}


const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#2F353A',
      alignItems: 'center',
      justifyContent: 'center',
      marginTop:25
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
    input: {
      backgroundColor:'#FFF',
      color:'#000',
      textAlign:'left',
      paddingLeft: 10,
      justifyContent:'center',
      borderRadius: 15,
      width: width*0.9,
      height: 40,
      marginBottom: 20
    },
    title: {
      alignSelf:'center',
      alignContent:'center',
      padding:15,
      marginBottom:10,
      fontSize:28,
      color:'#FFF'
    },
    
  });

export default changePwdScreen;