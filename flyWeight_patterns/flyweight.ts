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
