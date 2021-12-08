import fetch from 'node-fetch';

async function* iteratorResults<DataType>(baseUrl: string) {
  let nextUrl: string | undefined = baseUrl;
  do {
    const response = await fetch(nextUrl);
    const json: {
      next?: string;
      results: DataType[];
    } = await response.json();
    yield* json.results;
    nextUrl = json.next;
  } while (nextUrl);
}

interface Pokemon {
  name: string;
  url: string;
}
(async function () {
  for await (const result of iteratorResults<Pokemon>(
    'https://pokeapi.co/api/v2/pokemon'
  )) {
    console.log(result);
    if (result.name == 'pikachu') {
      break;
    }
  }
})();
