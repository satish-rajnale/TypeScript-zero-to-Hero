import { getPokeList } from "./getPokemon";

describe("getPokemonList", function(){
    it("should get list", (done)=>{
        getPokeList().then(list => {
            console.log("running test getpokemonlist");
            expect(list.results[0].name).toBe("bulbasaur");
            done();
        })
    })
})

//here you might get an error without done like 
// Cannot log after tests are done. Did you forget to wait for something async in your test?
//here the getpokelist function is dropping out and getting done before value comes back to .then this is an async problem
//so jest with done ensures that it actually gets called and then our test is complete

//or could use async await
describe("getPokemonList", function(){
    it("should get list", async ()=>{
      const list = await  getPokeList();
      
        console.log("running test getpokemonlist");
        expect(list.results[0].name).toBe("bulbasaur");
            
        
    })
})