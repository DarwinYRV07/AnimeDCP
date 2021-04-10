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
        case "getLists":
            return{...state,list:action.payload}
        break;
        default:
            return state;

    }
}


const animelistRef =firebase.firestore().collection("listas");

const createList = (dispatch)=>(name,author)=>{
    const data = {
        name,
        userid:author
    };

    animelistRef.add(data).then((data)=>{
        dispatch({type:"errorMessage",payload:"List added"})
        console.log(data)
        
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


const addAnime = (dispatch)=>(title,url,score,idlist,aid,dateStart,status)=>{
    const animesRef = firebase.firestore().collection("listas").doc(idlist).collection("animes");
    const data = {
        title,
        url,
        score,
        idlist,
        aid,
        dateStart,
        status
    }

    animesRef.add(data).then((data)=>{
        dispatch({type:"errorMessage",payload:"List added"})
        console.log(data)
        
    }).catch((error)=>{
        dispatch({type:"errorMessage",payload:error.message})
    })

};


export const {Provider,Context}= createDataContext(
    listReducer,
    {
        createList,
        addAnime,
        getLists
    },
    {
        list:{},
        errorMessage:""
    }
);