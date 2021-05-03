import houses from "./houses.json";
import { House } from "./interfaces/interface";



// interface HouseWithID {
//     id : number;
//     name: string;
//     planets: string | string[];
// }
// no need for above one use extends interface method and your extra types
interface HouseWithID extends House {
  id: number;
}

// function findHouses(houses: string): HouseWithID[];
// function findHouses(
//   houses: string,
//   filter: (house: House) => boolean
// ): HouseWithID[];
// function findHouses(houses: House[]): HouseWithID[];
// function findHouses(
//   houses:House[],
//   filter: (house: House) => boolean
// ): HouseWithID[];

// simplify these above signatures
function findHouses(houses: string | House[]): HouseWithID[];
function findHouses(
  houses: string | House[],
  filter: (house: House) => boolean
): HouseWithID[];

//there is also no need to incude above signature you can just use the
// following defining method for each of your function

function findHouses(
  input: string | House[],
  filter?: (house: House) => boolean
): HouseWithID[] {
  const localHouses: House[] =
    typeof input === "string" ? JSON.parse(input) : input;

  return (filter ? localHouses.filter(filter) : localHouses).map((house) => ({
    id: localHouses.indexOf(house),
    ...house,
  }));
}

console.log(
  findHouses(JSON.stringify(houses), ({ name }) => name === "Atreides")
);

console.log(findHouses(houses, ({ name }) => name === "Harkonnen"));
