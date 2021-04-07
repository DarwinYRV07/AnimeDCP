import React from "react"

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

    return data.results;
};

export const fetchAnimeEs = async (animeId) =>{
    const endpoint = `https://api.jikan.moe/v3/anime/${animeId}`;
    const response = await fetch(endpoint);
    const data =  await response.json();

    /*data.genres.map((gen)=>{
        console.log(gen.name);
    })*/
    
    //console.log(data.genres[0].name);
    //console.log(data);

    return data;
};

export const fetchAnimeGenero = async (animeId) =>{
    const endpoint = `https://api.jikan.moe/v3/anime/${animeId}`;
    const response = await fetch(endpoint);
    const data =  await response.json();
    const generos = [];
    const genres = data.genres.map((gen)=>{generos.push(gen.name)});
    //console.log(data.genres[0].name);
    //console.log(generos);

    return generos;
};

export const ferchAnimeRelacionado = async(animeId) =>{
    const endpoint = `https://api.jikan.moe/v3/anime/${animeId}`;
    const response = await fetch(endpoint);
    const data =  await response.json();
    //const Relacionado = [];
    const Sequel = data.related.Sequel;//.map((seq)=>{Relacionado.push(seq.mal_id,seq.name,seq.url)});
    //console.log(data.genres[0].name);
    console.log(Sequel);
    return Sequel;
}

    ///const fetch = require("node-fetch");
