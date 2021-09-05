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

const getFirstPokemon = async (): Promise<Pokemon> => 
    new Promise(async (resolve , reject) => {
        try{
            console.log("getting the list!!");
            const list: PokemonResults = await getPokeList();
            resolve(await getPokemon(list.results[0].url));
        }catch(err){
            reject(err);
        }
    });



(async function(){
    try{
      const pokemonPromise = await  getFirstPokemon();
      const pokemon = await pokemonPromise;
     //   console.log(pokemon.name);

        const pokemon2 = await  pokemonPromise;
     //   console.log(pokemon2.name);
// here same promise returned by getFirstPokemon is called twice but we get output as:
//output::  // getting the list!!
            // bulbasaur
            // bulbasaur
//notive that getting the list is only output once..
//that is because the promise is already fulfilled and we sort of get cached value

    }catch(err){
    console.error(err);
}})();

(async function(){
    try{
      const list = await  getPokeList();

      //a forEach function might throw an error for a list of 20 or more as it some inflexion issue with async await for making too many requests

        // list.results.forEach(async (listitem) => {
        //    const pokemon = await getPokemon(listitem.url);
        //    console.log(pokemon.name) 
        // });
        
        
        //a simple solution would be a for loop
        // for(const listitem of list.results){
        //     const pokemon = await getPokemon(listitem.url);
        //    console.log(pokemon.name) 
        // }

        //interesting pattern using reduce where prev val(acc) is a promise and next val(arr[index]) is pokemon
        //so thats gonna be a promise that feeds back into itself using the dependancy(second param) of reduce
        // list.results.reduce(async (promise, pokemon) => {
        //     await promise;
        //     return getPokemon(pokemon.url).then(p => console.log(p.name))
        // }, Promise.resolve(undefined));

        //using promise.all
       const data = await Promise.all(list.results.map((pokemon) => getPokemon(pokemon.url)));
       console.log(data);
        console.log(">> Done")

    }catch(err){
    console.error(err);
}})();
