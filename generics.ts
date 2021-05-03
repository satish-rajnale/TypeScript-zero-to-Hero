import { Rank, Pokemon } from "./interfaces/interface";

function defineState<Type>(initial: Type): [() => Type, (v: Type) => void] {
  let str: Type = initial;
  return [
    () => str,
    (v: Type) => {
      str = v;
    },
  ];
}

const [data, setData] = defineState("Im a string now");

console.log(data());
setData("First string");
console.log(data());

// const [num, setNum] = defineState(1);
// maybe you wanted to set initial to  null then you have to overwrite your generic Type to accept both null and your type as below
const [num, setNum] = defineState<number | null>(null);

console.log(num());
setNum(30);
console.log(num());

// interface Rank<T> {
//     item: T;
//     rank:  number
// }

function ranker<RankType>(
  items: RankType[],
  rank: (v: RankType) => number
): RankType[] {
  const ranks: Rank<RankType>[] = items.map((item) => ({
    item,
    rank: rank(item),
  }));

  ranks.sort((a, b) => a.rank - b.rank);
  return ranks.map((i) => i.item);
}

console.log(ranker([1, 2, 3, 4, 5, 22, 2, 3, 54], (v) => v ** 2 + 10));
//  [
//    1, 2,  2,  3, 3,
//    4, 5, 22, 54
//  ]

const pokemon: Pokemon[] = [
  { name: "Charmander", hp: 4 },
  { name: "pixi", hp: 3 },
];

const pokemonRanker = ranker(pokemon, ({ hp }) => hp % 3);
console.log(pokemonRanker); //[ { name: 'pixi', hp: 3 }, { name: 'Charmander', hp: 4 } ]
