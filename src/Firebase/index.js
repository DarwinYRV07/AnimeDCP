import  firebase from "firebase/app";
import "@firebase/auth";
import "@firebase/firestore";
import getEnvVars from "../../enviroment";

const {
    apiKey, 
    authDomain, 
    projectId, 
    storageBucket, 
    messagingSenderId, 
    appId
} = getEnvVars();


// Configuracion de firebase
const firebaseConfig ={
    apiKey,
    authDomain,
    projectId,
    storageBucket,
    messagingSenderId,
    appId,
};

//Verificacion si se inicializo una app 

if (!firebase.apps.length) firebase.initializeApp(firebaseConfig);

export {firebase};
