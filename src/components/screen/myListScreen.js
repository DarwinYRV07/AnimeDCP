import React, { useState, useContext, useEffect } from 'react' 
import { StyleSheet, View, Text, Dimensions,TextInput,Modal,Pressable,FlatList,TouchableOpacity } from 'react-native'
import {FAB} from "react-native-paper"
import {Context as ListAnimeContext} from '../../providers/listAnimeContext'
import {Context as AuthContext} from '../../providers/AuthContext'
import CardSimple from '../cards/CardSimple'


const{width,height}=Dimensions.get("screen");

const myListScreen =({navigation})=>{
    const {
      createList,
      state,
      getLists,
      delList,
      updList    
    } = useContext(ListAnimeContext)
    const {state:authstate} = useContext(AuthContext)
    
    const [modalVisible, setModalVisible] = useState(false);
    const [modalVisible2, setModalVisible2] = useState(false);
    const [listName,setListName] =useState("")
    const [idList,setIdList] = useState("");
    const [data,setData] = useState([]);
    const [recharge,setRecharge] = useState(true);
    useEffect(() => {
      getLists(authstate.user.id);
    }, [])

    useEffect(() => {
      //console.log(Array.isArray(state.list))
      if(Array.isArray(state.list)){
        setData(state.list)
      } 
    }, [state])
    
    useEffect(() => {
      const unsubscribe = navigation.addListener('focus', () => {
        getLists(authstate.user.id)
      });
      return unsubscribe;
   }, [navigation])

    const handlerCreate=()=>{
      if(listName){
        console.log("creando")
        createList(listName,authstate.user.id);
        setModalVisible(!modalVisible)
        setRecharge(!recharge)
        setListName("")

      }else{
        console.log("error")
      }

    }
    const handlerGolist=(id,name)=>{
      navigation.navigate("animeList",{idList:id,name:name});
    }

    const handlerDelList=(id,idlist)=>{
      delList(id,idlist);
    }

    const updateList =()=>{
      updList(idList,listName)
      setListName("")
      setModalVisible2(!modalVisible2)
    }


    return(
        <View style={styles.container}>
                <View style={styles.header}><Text style={styles.text}>MY LISTS</Text></View>    
                <Modal
                    animationType="slide"
                    transparent={true}
                    visible={modalVisible}
                    onRequestClose={() => {
                    setModalVisible(!modalVisible);
                    }}
                >
                    <View  transparent={true} style={styles.containermdl}>
                    <View style={styles.modalView}>
                        <Text style={styles.modalText}>New List</Text>
                        <TextInput 
                            style={styles.input} 
                            placeholder="List name"    
                            value={listName} 
                            onChangeText={setListName}
                            autoCapitalize="none"
              
                        />
                        <Pressable
                        style={[styles.button, styles.buttonAdd]}
                        onPress={() => handlerCreate()}
                        >
                        <Text style={styles.textStyle}>SAVE</Text>
                        </Pressable>
                        <Pressable
                        style={[styles.button, styles.buttonClose]}
                        onPress={() => setModalVisible(!modalVisible)}
                        >
                        <Text style={styles.textStyle}>CANCEL</Text>
                        </Pressable>
                        
                    </View>
                    </View>
                </Modal>
                <Modal
                    animationType="slide"
                    transparent={true}
                    visible={modalVisible2}
                    onRequestClose={() => {
                    setModalVisible(!modalVisible2);
                    }}
                >
                    <View  transparent={true} style={styles.containermdl}>
                    <View style={styles.modalView}>
                        <Text style={styles.modalText}>UpdateList List</Text>
                        <TextInput 
                            style={styles.input} 
                            placeholder="List name"    
                            value={listName} 
                            onChangeText={setListName}
                            autoCapitalize="none"
              
                        />
                        <Pressable
                        style={[styles.button, styles.buttonAdd]}
                        onPress={() => updateList()}
                        >
                        <Text style={styles.textStyle}>UPDATE</Text>
                        </Pressable>

                        <Pressable
                        style={[styles.button, styles.buttonClose]}
                        onPress={() => setModalVisible2(!modalVisible2)}
                        >
                        <Text style={styles.textStyle}>CANCEL</Text>
                        </Pressable>
                        
                    </View>
                    </View>
                </Modal>


                {data?(<FlatList 
                            ListEmptyComponent={<Text style={{color:"#fff"}}>No has registrado listas!</Text>}
                            data={data}
                            key={({item})=>{item.id}}
                            horizontal={false}
                            renderItem={({item}) => {
                            return (
                                  <CardSimple
                                  name = {item.name}
                                  callbacktitulo ={()=>{handlerGolist(item.id,item.name)}}
                                  editar ={()=>{
                                    setModalVisible2(!modalVisible2);
                                    setIdList(item.id);
                                    setListName(item.name)
                                  }}
                                  eliminar={()=>{handlerDelList(item.id,item.id)}}

                                  />
                            )  
                             
                            }}
                            keyExtractor={(item, index) => index.toString()}
                />):(null)}
                <FAB
                    icon="plus"
                    style={styles.fab}
                    onPress={() => {
                        setModalVisible(!modalVisible);
  
                    }}
                />
        </View>
        
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#2F353A',
        alignItems: 'center',
        justifyContent: 'center',
        
        
    },
    containermdl:{
      flex: 1,
      // backgroundColor: '#2F353A',
      alignItems: 'center',
      justifyContent: 'center',
    },
    text:{
      color:"#BFC9CE",
      fontSize:30,
      marginTop:10,
      marginBottom:15,
      position:"relative"
  },
    modalView: {
        backgroundColor: "#2F353A",
        borderRadius: 20,
        padding: 35,
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: {
          width: 0,
          height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 4
      },
      button: {
        borderRadius: 20,
        padding: 10,
        elevation: 2
      },
      buttonAdd: {
        backgroundColor: "#22DEFA",
        width:width*0.4,
        marginBottom:5
      },
      buttonClose: {
        backgroundColor: "#8C3235",
        width:width*0.4
      },
      textStyle: {
        color: "white",
        fontWeight: "bold",
        textAlign: "center"
      },
      modalText: {
        color:'#22DEFA',
        marginBottom: 15,
        textAlign: "center",
        fontSize:15
      },
      fab: {
        position: "absolute",
        margin: 20,
        right: 0,
        bottom: 15,
        backgroundColor:"#22DEFA"
      },
      input:{
          backgroundColor:"#fff",
          color:"#000",
          textAlign:"left",
          paddingLeft:10,
          justifyContent:"center",
          borderRadius:15,
          width: width*0.5,
          height: 40,
          marginBottom:10
      },
      listas:{
        flex:1,
        backgroundColor:"#BFC9CE",
        width:width*0.8,
        height:50,
        borderRadius:20,
        margin:8,
        alignItems:'center',
        justifyContent:'center',
      },
      textLista:{
        color:"#2F353A",
        fontSize:20
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

export default myListScreen;