
interface Pokemon {
  id: string;
  attack: number;
  defense: number;
}

interface BaseRecord {
  id: string;
}
//@ts-ignore
interface Database<T extends BaseRecord> {
  set(newVal: T): void;
  get(id: string): T | undefined;
}
//@ts-ignore
class InMemoryDatabse<T extends BaseRecord> implements Database< T> {
  private db: Record<string, T> = {};

  public set(newVal: T): void {
    this.db[newVal.id] = newVal;
  }
  public get(id: string): T {
    return this.db[id];
  }
}


const pokemonDB = new InMemoryDatabse<Pokemon>();
pokemonDB.set({
    id:"pikachu",
    attack:54,
    defense: 20
});

console.log(pokemonDB.get("pikachu"));


//factory pattern
function createDatabase<T extends Pokemon>() { // create InMemoryDatabse class at runtime
    //@ts-ignore
    class InMemoryDatabse implements Database<T> {
      private db: Record<string, T> = {};
  
      public set(newVal: T): void {
        this.db[newVal.id] = newVal;
      }
      public get(id: string): T {
        return this.db[id];
      }
    };
  
    return InMemoryDatabse;
  }
  
  const PokemonDB = createDatabase();
  const pokeDBObj = new PokemonDB();
  pokeDBObj.set({
    id: "raichu",
    attack: 54,
    defense: 20,
  });
  
  console.log(pokeDBObj.get("raichu"));