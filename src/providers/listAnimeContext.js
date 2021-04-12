import createDataContext from "./createDataContext"
import {firebase} from "../Firebase";


const listReducer =(state,action)=>{
    switch(action.type){
        case "errorMessage":
            return{...state,errorMessage:action.payload}
        break;
        case "createList":
            return{...state,list:[...list,action.payload]}
        break;
        case "addAnime":
            return{...state,list:[...list,action.payload]}
        break;
        case "delList":
            return{...state,list:[...list,action.payload]}
        break;
        case "delAnime":
            return{...state,list:[...list,action.payload]}
        break;
        case "getLists":
            return{...state,list:action.payload}
        break;
        case "getAnimeList":
            return{...state,animes:action.payload}
        break;
        default:
            return state;

    }
}
//COLECCIONES
const animesRef = firebase.firestore().collection("animes")
const animelistRef =firebase.firestore().collection("listas");

const createList = (dispatch)=>(name,author)=>{
    const data = {
        name,
        userid:author
    };

    animelistRef.add(data).then((data)=>{
        dispatch({type:"errorMessage",payload:"List added"})
        
    }).catch((error)=>{
        dispatch({type:"errorMessage",payload:error.message})
    })
};

const getLists = (dispatch)=>(userId)=>{

    animelistRef.where("userid","==",userId).orderBy("name","desc").onSnapshot((querySnapshot)=>{
        const Lists = []
        querySnapshot.forEach((doc)=>{
            const list = doc.data();
            list.id = doc.id;
            Lists.push(list); 
        });
        dispatch({type:"getLists",payload:Lists})
    },(error) =>{
        dispatch({type:"errorMessage",payload:error});
    })
}


const addAnime = (dispatch)=>(title,url,score,idlist,aid,status)=>{

    // const existe = Animes.map( function(item){ console.log(item) } )

    const data = {
        title,
        url,
        score,
        idlist,
        aid,
        status
    }

    animesRef.add(data).then((data)=>{
        dispatch({type:"errorMessage",payload:"Anime added"})
        
    }).catch((error)=>{
        dispatch({type:"errorMessage",payload:error.message})
    })

};

const getAnimeList=(dispatch)=>(idlist)=>{
    animesRef.where("idlist","==",idlist).orderBy("aid","desc").onSnapshot((querySnapshot)=>{
        const Animes = []
        querySnapshot.forEach((doc)=>{
            const list = doc.data();
            list.id = doc.id;
            Animes.push(list); 
        });
        dispatch({type:"getAnimeList",payload:Animes})
    },(error) =>{
        dispatch({type:"errorMessage",payload:error});
    })

};

const delList =(dispatch)=>(idlist)=>{
    animelistRef.where("idlist","==",idlist).orderBy("aid","desc").get()
    .then(querySnapshot => {
      querySnapshot.forEach((doc) => {
        doc.ref.delete().then(() => {
          console.log("Documento eliminado con éxito!");
        }).catch(function(error) {
          console.error("Error eliminando documento: ", error);
        });
      });
    })
    .catch(function(error) {
      console.log("Error Obteniendo Documentos: ", error);
    });
}

const delAnime =(dispatch)=>(id)=>{
    animesRef.where("id","==",id).orderBy("aid","desc").get()
    .then(querySnapshot => {
      querySnapshot.forEach((doc) => {
        doc.ref.delete().then(() => {
          console.log("Documento eliminado con éxito!");
        }).catch(function(error) {
          console.error("Error eliminando documento: ", error);
        });
      });
    })
    .catch(function(error) {
      console.log("Error Obteniendo Documentos: ", error);
    });
}




export const {Provider,Context}= createDataContext(
    listReducer,
    {
        delAnime,
        getAnimeList,
        createList,
        addAnime,
        getLists
    },
    {
        list:{},
        animes:{},
        errorMessage:""
    }
);