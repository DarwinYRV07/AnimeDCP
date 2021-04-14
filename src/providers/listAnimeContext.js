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
        case "updList":
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

const animesRef = firebase.firestore().collection("animes")
const animelistRef =firebase.firestore().collection("listas");

const createList = (dispatch)=>(name,author)=>{
    const Identdoc = name+author;
    const data = {
        name,
        userid:author
    };

    animelistRef.doc(Identdoc).set(data).then((data)=>{
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
    const docIdent = idlist.toString()+aid.toString();
    const data = {
        title,
        url,
        score,
        idlist,
        aid,
        status,
        docIdent
    }
    

    animesRef.doc(docIdent).set(data).then((data)=>{
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


const delAnime =(dispatch)=>(Identdoc)=>{

    animesRef.doc(Identdoc).delete().then(()=>{
        dispatch({type:"errorMessage",payload:"Anime Deleted"})
    }).catch((error)=>{
        dispatch({type:"errorMessage",payload:error.message})
    })
}

const vaciarLista =(idlist)=>{
    animesRef.where("idlist","==",idlist).orderBy("aid","desc").onSnapshot((querySnapshot)=>{
        querySnapshot.forEach((doc)=>{
            const list = doc.data();
            list.id = doc.id;
            console.log(list.id)
            animesRef.doc(list.id).delete().then(console.log("borrado"))
        });
    })
}

const delList =(dispatch)=>(Identdoc,idlist)=>{
    
    animelistRef.doc(Identdoc).delete().then(()=>{
        vaciarLista(idlist);
        dispatch({type:"errorMessage",payload:"List Deleted"})
    }).catch((error)=>{
        dispatch({type:"errorMessage",payload:error.message})
    })
}

const updList=(dispatch)=>(idlist,name)=>{
    animelistRef.doc(idlist).update({
        name:name
    })
    .then(() => {
        dispatch({type:"errorMessage",payload:"Anime Deleted"})
    }).catch((error)=>{

    })
    
}

export const {Provider,Context}= createDataContext(
    listReducer,
    {
        updList,
        delList,
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