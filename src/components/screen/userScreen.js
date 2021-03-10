import React from 'react' 
import {StyleSheet, Text, View} from 'react-native'
import {firebase} from '../../Firebase'
import Button from '../button/button'


const userScreen =({navigation})=>{

    const user = firebase.auth().currentUser;

    const handleLogOut=()=>{
        firebase.auth().signOut().then((Response)=>{
            navigation.navigate("SignIn");
        }
            
        ).catch(
          (error)=>{console.log(error)}
        );
        console.log("adios");
        
    }
    
    return(
        <View style={styles.container}>
                <Text>Current User:{user.email}</Text>
                <Button title="logOut" 
                callback={handleLogOut}/>
                <Button title="Change Password" callback={()=>{navigation.navigate("ChangePwd")}}/>
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

export default userScreen;