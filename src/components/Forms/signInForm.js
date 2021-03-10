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
    const [error, setError] = useState("");


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

  const handleLogInWithGoogle=()=>{
    const provider = new firebase.auth.GoogleAuthProvider();

    firebase.auth()
  .signInWithPopup(provider)
  .then((result) => {
    
    var credential = result.credential;

    // This gives you a Google Access Token. You can use it to access the Google API.
    var token = credential.accessToken;
    // The signed-in user info.
    var user = result.user;
    // ...
  }).catch((error) => {
    // Handle Errors here.
    var errorCode = error.code;
    var errorMessage = error.message;
    // The email of the user's account used.
    var email = error.email;
    // The firebase.auth.AuthCredential type that was used.
    var credential = error.credential;
    // ...
  });
  }

  const handleLogOut=()=>{
    firebase.auth().signOut().catch(
      (error)=>{console.log(error)}
    );
    console.log("adios");
  }

  const handleSignin = () => {
    firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then((response) => {
        console.log("logueo")
        // Obtener el Unique Identifier generado para cada usuario
        // Firebase -> Authentication
        const uid = response.user.uid;
        // console.log(response.user.email);
        // console.log(response.user.uid);
        

        // Obtener la colección desde Firebase
        const usersRef = firebase.firestore().collection("users");
        //console.log(firebase.firestore().collection("users"));

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
            
              navigation.navigate("BottonTabs", {user})
          });
      })
      .catch((error) => {
        setError(error.code);
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
            <SocialIcon onPress={handleLogInWithGoogle} style={styles.button} title='Sign In' button type='google'/>
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