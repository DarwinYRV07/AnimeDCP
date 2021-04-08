import React, { useState,useContext} from 'react';
import { Input, SocialIcon } from "react-native-elements";
import { validate } from "email-validator";
import { firebase } from "../../Firebase/index";
import Button from "../button/button";
import Alert from "../shared/Alert"; 
import { StyleSheet, Text, View, Dimensions, TextInput } from 'react-native';
import { Context as AuthContext } from "../../providers/AuthContext";


const { width, height } = Dimensions.get("screen");

const signInForm =({navigation})=>{
    const { state, signin, clearErrorMessage } = useContext(AuthContext);
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
      provider.addScope('https://www.googleapis.com/auth/contacts.readonly');
      firebase.auth().signInWithRedirect(provider);

      firebase.auth()
    .getRedirectResult(provider)
    .then((result) => {
      
      const credential = result.credential;
      const token = credential.accessToken;
      const user = result.user;

    }).catch((error) => {
      // Handle Errors here.
      const errorCode = error.code;
      const errorMessage = error.message;
      const email = error.email;
      const credential = error.credential;
      console.log(errorCode)
      console.log(errorMessage)
      console.log(email)
      console.log(credential)
      // ...
    });
  }

  const handleSignin = () => {
    firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then((response) => {
        console.log("logueo")
        const uid = response.user.uid;
        const usersRef = firebase.firestore().collection("users");
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
            <TextInput 
                style={styles.input} 
                placeholder="Email"    
                value={email} 
                onChangeText={setEmail}
                autoCapitalize="none"
                onBlur={() => {handleVerify("email");}}errorMessage={ emailError? "Please enter your email account": null} 
            />

            <Text style={styles.text}>Password:</Text>
            <TextInput  
                style={styles.input} 
                placeholder={"Password"} 
                value={password} 
                onChangeText={setPassword}
                secureTextEntry
                autoCapitalize="none"
                onBlur={() => {handleVerify("password");}}errorMessage={passwordError ? "Please enter your password" : null}
            />
            <Button title="Login"  callback={handleSignin} />
            <SocialIcon onPress={()=>{handleLogInWithGoogle()}} style={styles.button} title='Sign In' button type='google'/>
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