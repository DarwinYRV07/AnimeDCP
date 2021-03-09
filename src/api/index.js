export const fetchAnimeList = async () =>{
    
    const endpoint = `https://api.jikan.moe/v3/top/anime/1/airing`;
    
    const response = await fetch(endpoint);
    const data =  await response.json();
    const arreglo = data.top;
    return arreglo;
       
};

export const fetchAnimeSearch = async (animeName) =>{
    
        const endpoint = `https://api.jikan.moe/v3/search/anime?q=${animeName}`;
        const response = await fetch(endpoint);
        const data =  await response.json(); 
        console.log(data);
    //console.log(data);

    return data;
};

export const fetchAnimeSearchId = async (animeId) =>{
    const endpoint = `https://api.jikan.moe/v3/anime/${animeId}`;
    const response = await fetch(endpoint);
    const data =  await response.json();
  
    console.log(data);
//console.log(data);

return data;
};

///const fetch = require("node-fetch");