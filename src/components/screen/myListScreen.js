import React, { useState, useContext, useEffect } from 'react' 
import { StyleSheet, View, Text, Dimensions,TextInput,Modal,Pressable,FlatList } from 'react-native'
import {FAB} from "react-native-paper"
import {Context as ListAnimeContext} from '../../providers/listAnimeContext'
import {Context as AuthContext} from '../../providers/AuthContext'

const{width,height}=Dimensions.get("screen");

const myListScreen =()=>{
    const {createList,state,getLists} = useContext(ListAnimeContext)
    const {state:authstate} = useContext(AuthContext)
    
    const [modalVisible, setModalVisible] = useState(false);
    const [listName,setListName] =useState("")
    const [data,setData] = useState(state.list);
    const [recharge,setRecharge] = useState(true);
    useEffect(() => {
      getLists(authstate.user.id);
    }, [])

    useEffect(() => {
      if(state.list){
        setData(state.list)
      } 

      console.log(data);
  }, [state])
    
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


    return(
        <View style={styles.container}>
                <Text style={styles.text}>
                    My list screen
                </Text>
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
                        style={[styles.button, styles.buttonClose]}
                        onPress={() => handlerCreate()}
                        >
                        <Text style={styles.textStyle}>Hide Modal</Text>
                        </Pressable>
                        <Pressable
                        style={[styles.button, styles.buttonClose]}
                        onPress={() => setModalVisible(!modalVisible)}
                        >
                        <Text style={styles.textStyle}>Cancel</Text>
                        </Pressable>
                        
                    </View>
                    </View>
                </Modal>

                {data?(<FlatList 
                            ListEmptyComponent={<Text>No hay animes disponibles!</Text>}
                            data={data}
                            key={({item})=>{item.id}}
                            horizontal={false}
                            renderItem={({item}) => {
                            return (
                                <View style={styles.listas}>
                                     <Text style={styles.textLista}>{(item.name.toUpperCase())}</Text>
                                </View>
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
      buttonClose: {
        backgroundColor: "#2196F3",
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
      }
})

export default myListScreen;