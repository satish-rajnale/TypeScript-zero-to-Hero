import fetch from "node-fetch";

export interface PokemonResults {
    count: number;
    next?: string;
    previous?: string;
    results: {
        name: string;
        url: string;
    }[];
}

export interface Pokemon {
    id: number;
    name: string;
    stats: {
        base_stat: Number;
        effort: Number;
        stat:{
            name: string;
            url: string;
        }
        
    }[];
}

// const pokedata = fetch("https://pokeapi.co/api/v2/pokemon?limit=10")
//                         .then((res) => res.json())
//                         .then((data : PokemonResults) => data)
//                         .then((data) => fetch("https://pokeapi.co:5000/api/v2/pokemon?limit=10")//data.results[0].url
//                                 .then((res) => res.json())
//                                 .then((data) => console.log(data.stats))
//                                 )
//                         .catch(err => console.error("handeled by outer::",err));
//so you would get a cascade of multiple nested fetch functions and thi is not a particularly pleasant way to code

//then we will be using async await



export const getPokeList = async () : Promise<PokemonResults> => {
    const ListPokeres = await fetch("https://pokeapi.co/api/v2/pokemon?limit=20");
return await ListPokeres.json();
}

export const getPokemon = async (url: string) : Promise<Pokemon> => {
    const data = await fetch(url);
return await data.json();
}

export const getFirstPokemon = async (): Promise<Pokemon> => 
    new Promise(async (resolve , reject) => {
        try{
            console.log("getting the list!!");
            const list: PokemonResults = await getPokeList();
            resolve(await getPokemon(list.results[0].url));
        }catch(err){
            reject(err);
        }
    });