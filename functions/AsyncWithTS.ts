import PromisePool from '@supercharge/promise-pool';
import { getFirstPokemon, getPokeList, getPokemon } from '../src/getPokemon';

// (async function(){
//     try{
//       const pokemonPromise = await  getFirstPokemon();
//       const pokemon = await pokemonPromise;
//      //   console.log(pokemon.name);

//         const pokemon2 = await  pokemonPromise;
//      //   console.log(pokemon2.name);
// // here same promise returned by getFirstPokemon is called twice but we get output as:
// //output::  // getting the list!!
//             // bulbasaur
//             // bulbasaur
// //notice that getting the list is only output once..
// //that is because the promise is already fulfilled and we sort of get cached value

//     }catch(err){
//     console.error(err);
// }})();

(async function () {
  try {
    const list = await getPokeList();

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
    //    const data = await Promise.all(list.results.map((pokemon) => getPokemon(pokemon.url)));
    //    console.log(data);
    //     console.log(">> Done")

    // using promise pooling
    console.time();
    const { results, errors } = await PromisePool.withConcurrency(10)
      .for(list.results)
      .process(async (data) => {
        //cmd k + i on data to see its type def
        return await getPokemon(data.url);
      });
    console.log(results.map((p) => p.name));
    console.log('>> Done');
    console.timeEnd(); // here assuming you have a constant internet connc the concurrency(2) will give a time of 2-3 sec and a concurrency(10) would give less than 2 sec
  } catch (err) {
    console.error(err);
  }
})();
