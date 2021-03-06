import * as firebase from "firebase";
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
if (!firebase.app.length) firebase.initializaApp(firebaseConfig);

export {firebase};
