import React,{useState,useEffect,useContext} from 'react' 
import { Dimensions} from 'react-native'
import {StyleSheet, Text, View,ImageBackground,Switch} from 'react-native'
import {firebase} from '../../Firebase'
import Button from '../button/button'
import theme from "../../Theme";



const {width,height} = Dimensions.get("screen");

const userScreen =({navigation})=>{
 
    const user = firebase.auth().currentUser;
    const [colorHeader,setColorHeader] = useState("#3e3e3e")



    const handleLogOut=()=>{
        firebase.auth().signOut().then((Response)=>{
            navigation.navigate("SignIn");
        }
            
        ).catch(
          (error)=>{console.log(error)}
        );
        console.log("adios");
        
    }

    const texto= () =>{
        return(
            <View>
                    <Text>RSETTINGS</Text>
                </View>
        )
    }


    
    return(
        <View style={styles.container}>
          <ImageBackground source={require("../../../assets/background.jpg")} style={styles.image}> 
                {/* <View style={styles.header}>
                    <Text backgroundColor={colorHeader}>SETTINGS</Text>
                </View> */}
                {texto()}
                <Text style={styles.text}>Current User:</Text>
                <Text style={styles.text}>{"PROBANDO"}</Text>
                <Switch
                    trackColor={{ false: "#767577", true: "#81b0ff" }}
                    thumbColor={true ? "#f5dd4b" : "#f4f3f4"}
                    ios_backgroundColor="#3e3e3e"
                    //onValueChange={setDarkMode}
                    value={true}
                />
                <Button title="logOut" 
                callback={handleLogOut}/>
                <Button title="Change Password" callback={()=>{navigation.navigate("ChangePwd")}}/>
                </ImageBackground>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#2F353A',
        //justifyContent: 'center',
        //alignItems:"center"
      },
      text:{
          color:"white",
          fontSize:20,
          marginBottom:15,
      },
      header:{
        marginTop:45,
        marginBottom:15,
        position:"relative",
        borderRadius:5,
        backgroundColor: "#2F353A",
        alignItems:"center",
        justifyContent:"center",
        flexDirection:"row",
        shadowColor: "#000",
        width:width*0.95,
        shadowOffset: {
            width: 0,
            height: 4,
        }
      },image:{
        flex: 1,
        resizeMode:"cover",
        justifyContent: "center",
        width:width*1,
        alignItems:"center"
      },
})

export default userScreen;