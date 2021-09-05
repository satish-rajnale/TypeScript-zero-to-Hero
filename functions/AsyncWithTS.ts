import fetch from "node-fetch";

interface PokemonResults {
    count: number;
    next?: string;
    previous?: string;
    results: {
        name: string;
        url: string;
    }[];
}

interface Pokemon {
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



const getPokeList = async () : Promise<PokemonResults> => {
    const ListPokeres = await fetch("https://pokeapi.co/api/v2/pokemon?limit=10");
return await ListPokeres.json();
}

const getPokemon = async (url: string) : Promise<Pokemon> => {
    const data = await fetch(url);
return await data.json();
}





(async function(){
    try{
const list: PokemonResults = await getPokeList();
const pokemon = await getPokemon(list.results[0].url);

console.log(pokemon.name);
}catch(err){
    console.error(err);
}})();

