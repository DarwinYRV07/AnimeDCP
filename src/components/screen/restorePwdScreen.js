import React from "react";
import { View, StyleSheet, Dimensions,TouchableOpacity, Text } from "react-native"
import RestoreForm from "../Forms/RestoreForm";
import { ScrollView } from "react-native";

const {width} = Dimensions.get("screen");


const restorePwdScreen = ({navigation})=>{
    return(
        <ScrollView>
            <View style={styles.container}>
                <RestoreForm navigation={navigation}/>
                <TouchableOpacity onPress={()=>{navigation.goBack();}} >
                <Text style={styles.textrestore}>I now remember the password</Text>
                </TouchableOpacity>
            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#2F353A',
      alignItems: 'center',
      justifyContent: 'center',
    },
    textrestore:{
        color: "white",
        fontSize:15,
        textAlign:"right",
        width:width*0.8,
        marginTop:5,
        marginBottom:25,
    },
    
  });


export default restorePwdScreen;