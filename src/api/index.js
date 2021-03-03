const fetchAnimeList = async () =>{
    
    let num =0;
    let array = [];

    while(num != 100){
        num++;
        const endpoint = `https://api.jikan.moe/v3/anime/${num}`;
        const fetch = require("node-fetch");
        const response = await fetch(endpoint);
        const data =  await response.json();
  
        if(data.request_cached){
            array.push(data);
            console.log(data.title);
        }
    }   
    console.log(array.length);
    return array;
       
};

const fetchAnimeSearch = async (animeName) =>{
    
        const endpoint = `https://api.jikan.moe/v3/search/anime?q=${animeName}`;
        const fetch = require("node-fetch");
        const response = await fetch(endpoint);
        const data =  await response.json(); 
        console.log(data);
    //console.log(data);

    return data;
};

const fetchAnimeSearchId = async (animeId) =>{
    const endpoint = `https://api.jikan.moe/v3/anime/${animeId}`;
    const fetch = require("node-fetch");
    const response = await fetch(endpoint);
    const data =  await response.json();
  
    console.log(data);
//console.log(data);

return data;
};


//fetchQuizQuestion();
//fetchAnimeSearch("One");// => Le faltan datos {mal_id}
//fetchAnimeSearchId(952);