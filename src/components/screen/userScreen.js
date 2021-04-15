import React,{useState,useContext} from 'react' 
import { Dimensions} from 'react-native'
import {StyleSheet, Text, View,ImageBackground,Switch, TouchableOpacity} from 'react-native'
import { Avatar, ListItem } from 'react-native-elements'
import Icon from "react-native-vector-icons/FontAwesome5";
import {Divider} from 'react-native-paper'
import {firebase} from '../../Firebase'
import {Context as AuthContext} from '../../providers/AuthContext'




const {width,height} = Dimensions.get("screen");

const userScreen =({navigation})=>{
 
    const user = firebase.auth().currentUser;
    const {state} = useContext(AuthContext);
    const usuario = state.user.fullname;
    const email = state.user.email;
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
            <View style={styles.header}><Text style={styles.textHeader}>SETTINGS</Text></View>
            <Avatar
                rounded
                size='xlarge'
                source={ require('../../../assets/animeDCPIcon.png') }
                />
            <ListItem containerStyle={styles.listItem} style={{marginTop:40}}>
                <ListItem.Content style={styles.listContent}>
                <ListItem.Title style={styles.titulo}>{"Current User"}</ListItem.Title>
                <ListItem.Subtitle style={styles.subtitulo}>{usuario}</ListItem.Subtitle>
                </ListItem.Content>
            </ListItem>
            <Divider style={styles.divider}/>
            <ListItem containerStyle={styles.listItem}>
                <ListItem.Content style={styles.listContent}>
                <ListItem.Title style={styles.titulo}>{"E-mail"}</ListItem.Title>
                <ListItem.Subtitle style={styles.subtitulo}>{email}</ListItem.Subtitle>
                </ListItem.Content>
            </ListItem>
            <Divider style={styles.divider}/>
            <ListItem containerStyle={styles.listItem}>
                <ListItem.Content style={styles.listContent}>
                <TouchableOpacity onPress={()=>{navigation.navigate("ChangePwd")}}>
                    <View style={{flexDirection:"row"}}>
                      <Text>
                        <Text style={styles.titulo}>Change Password</Text>
                      </Text>
                      <Text style={{marginLeft:width*0.40}}>
                        {<Icon style={{fontSize:20, color:"#FFF"}} name={'sync-alt'}/>}
                      </Text>
                    </View>
                </TouchableOpacity>
                </ListItem.Content>
            </ListItem>
            <Divider style={styles.divider}/>
            <ListItem containerStyle={styles.listItem}>
                <ListItem.Content style={styles.listContent}>
                <TouchableOpacity onPress={handleLogOut}>
                    <View style={{flexDirection:"row"}}>
                      <Text>
                        <Text style={styles.titulo}>LogOut</Text>
                      </Text>
                      <Text style={{marginLeft:width*0.64}}>
                        {<Icon style={{fontSize:23, color:"#FFF"}} name={'sign-out-alt'}/>}
                      </Text>
                    </View>
                </TouchableOpacity>
                </ListItem.Content>
            </ListItem>
            <Divider style={styles.divider}/>
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
      listItem:{
        width:width*1,
        backgroundColor: '#2F353A',
        height:height*0.09
      },
      listContent:{
      },
      titulo:{
        fontSize:20,
        flexDirection:"row",
        color:"#FFF"
      },
      subtitulo:{
        fontSize:15,
        color:"#FFF"
      },
      text:{
          color:"white",
          fontSize:20,
      },
      textCorreo:{
        color:"#FFF",
        fontSize:15,
      },
      divider:{
        width:width*1,
        height:2,
        backgroundColor:"#444D51"
      },
      textHeader:{
        color:"#BFC9CE",
        fontSize:30,
        marginTop:10,
        marginBottom:15,
        position:"relative"
      },
      header:{
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
      header:{
        marginTop:20,
        marginBottom:20,
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

export default userScreen;