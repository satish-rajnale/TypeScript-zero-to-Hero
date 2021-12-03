import fetch from 'node-fetch';

interface Pokemon {
  species: {
    name: string;
    url: string;
  };
}
interface PokemonResults {
  count: number;
  next?: string;
  previous?: string;
  results: {
    name: string;
    url: string;
  }[];
}

function makeURLFlyweights<ReturnType>(urls: Record<string, string>) {
  const myObject: Record<string, Promise<ReturnType>> = {};

  return new Proxy(myObject, {
    get: (target, name: string) => {
      console.log(`Fetching ${name} from ${urls[name]}`);
      if (!target[name]) {
        target[name] = fetch(urls[name]).then((res) => res.json());
      }
      return target[name];
    },
  });
}

(async function () {
  const data = (await (
    await fetch('https://pokeapi.co/api/v2/pokemon?limit=10')
  ).json()) as PokemonResults;

  //   console.log(data);

  const urls = data.results.reduce(
    (acc, { name, url }) => ({
      ...acc,
      [name]: url,
    }),
    {}
  );

  //   console.log(urls);

  const lookup = makeURLFlyweights<Pokemon>(urls);
  const mypokemon = await lookup.bulbasaur;
  console.log(mypokemon);
})();
