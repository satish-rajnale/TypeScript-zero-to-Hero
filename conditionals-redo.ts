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
// removed this line and created an override for fetchPokemon
// type fetchPokemonResult<T> = T extends undefined ?void :  Promise<PokemonResults> ; 

function fetchPokemon(url: string , cb : (data:PokemonResults) => void) : void;
function fetchPokemon(url: string ) : Promise<PokemonResults>;

function fetchPokemon(url: string , cb? :(data: PokemonResults) => void) : unknown{
    if(cb){
        fetch(url)
            .then(resp => resp.json())
            .then(cb);
        return undefined; 
    }else {
        return fetch(url).then(res => res.json());
    }
};

// fetchPokemon("https://pokeapi.co/api/v2/pokemon?limit=10", (data) => {
//     data.results.forEach(element => {
//         console.log(element.name)        
//     });
// })

(async function () {
    const data = await fetchPokemon("https://pokeapi.co/api/v2/pokemon?limit=10") as PokemonResults  ;
     data.results.forEach(element => {
            console.log(element.name)        
        })
})()