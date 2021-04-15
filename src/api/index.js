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
    return data.results;
};

export const fetchAnimeEs = async (animeId) =>{
    const endpoint = `https://api.jikan.moe/v3/anime/${animeId}`;
    const response = await fetch(endpoint);
    const data =  await response.json();

    return data;
};

export const fetchAnimeGenero = async (animeId) =>{
    const endpoint = `https://api.jikan.moe/v3/anime/${animeId}`;
    const response = await fetch(endpoint);
    const data =  await response.json();
    const generos = [];
    const genres = data.genres.map((gen)=>{generos.push(gen.name)});
    return generos;
};

export const ferchAnimeRelacionado = async(animeId) =>{
    const endpoint = `https://api.jikan.moe/v3/anime/${animeId}`;
    const response = await fetch(endpoint);
    const data =  await response.json();

    const Sequel = data.related.Sequel;
    return Sequel;
}

