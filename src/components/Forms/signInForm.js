import React, { useState} from 'react';
import { Input, SocialIcon } from "react-native-elements";
import { validate } from "email-validator";
import { firebase } from "../../Firebase/index";
import Button from "../button/Button";
import Alert from "../shared/Alert"; 
import { StyleSheet, Text, View, Dimensions, TextInput } from 'react-native';

const { width, height } = Dimensions.get("screen");

const signInForm =({navigation})=>{
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [emailError, setEmailError] = useState(false);
    const [passwordError, setPasswordError] = useState(false);
    const [error, setError] = useState(false);


     // Verificar si se ingreso los datos del email y el password
  const handleVerify = (input) => {
    if (input === "email") {
      if (!email) setEmailError(true);
      else if (!validate(email)) setEmailError(true);
      else setEmailError(false);
    } else if (input === "password") {
      if (!password) setPasswordError(true);
      else setPasswordError(false);
    }
  };

  const handleSignin = () => {
    firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then((response) => {
        
        // Obtener el Unique Identifier generado para cada usuario
        // Firebase -> Authentication
        const uid = response.user.uid;
        console.log(response.user.email);
        console.log(response.user.uid);
        

        navigation.navigate("BottonTabs",  { user });
        

        // Obtener la colección desde Firebase
       const usersRef = firebase.firestore().collection("users");
        console.log(firebase.firestore().collection("users"));

        // Verificar que el usuario existe en Firebase authentication
        // y también está almacenado en la colección de usuarios.
        usersRef
          .doc(uid)
          .get()
          .then((firestoreDocument) => {
            console.log("Entro aqui");
            if (!firestoreDocument.exists) {
              setError("User does not exist in the database!");
              return;
            }

            // Obtener la información del usuario y enviarla a la pantalla Home
            const user = firestoreDocument.data();
            console.log("Simon");
            navigation.navigate("BottonTabs", { user });
          });
      })
      .catch((error) => {
        setError(error.message);
      });
  };

    return(
        <View>

            {error ? <Alert title={error} type="error" /> : null}
            <Text style={styles.text}>User:</Text>
            <Input 
                style={styles.input} 
                placeholder="Email"    
                value={email} 
                onChangeText={setEmail}
                autoCapitalize="none"
                onBlur={() => {handleVerify("email");}}errorMessage={ emailError? "Please enter your email account": null}
                  
            />

            <Text style={styles.text}>Password:</Text>
            <Input  
                style={styles.input} 
                placeholder={"Password"} 
                value={password} 
                onChangeText={setPassword}
                secureTextEntry
                autoCapitalize="none"
                onBlur={() => {handleVerify("password");}}errorMessage={passwordError ? "Please enter your password" : null}
            />
            <Button title="Login"  callback={handleSignin} />
            <SocialIcon style={styles.button} title='Sign In' button type='facebook'/>
        </View>
    );
};
const styles = StyleSheet.create({
    text:{
        color:"white",
        marginLeft:15,
        marginTop:10,
        marginBottom:10,
        fontSize:20,
        textAlign:"left",
        width:width*0.9
    },
    input:{
        backgroundColor:"#fff",
        color:"#000",
        textAlign:"left",
        paddingLeft:10,
        justifyContent:"center",
        borderRadius:15,
        width: width*0.9,
        height: 40,
        marginBottom:5
    },
    button: {
        alignSelf: "center",
        padding: 15,
        borderRadius: 30,
        marginBottom: 10,
        width: width * 0.8,
      },
});

export default signInForm;