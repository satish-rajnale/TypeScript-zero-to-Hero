// type MyGameInfo = {
//   name: string;
//   [key: string]: string ;
// } & Record<string, string>;

type MyGameInfo = {
    name: string;
    [key: string]: string | number;
  }

const newGame: MyGameInfo = {
  name: "COD",
  genre: "Action",
  players: 25,
};

interface GamesList {
    name:string,
    released: number
}

type Options<T> = {
    [Property in keyof T]: boolean
}

type MyGameList = Options<GamesList>; 
// now every key in MyGameList from GamesList is of type boolean


// Listeners object creation

type Listeners<T> = {
    [Prop in keyof T as `on${Capitalize<string  &  Prop>}Change`]?: (newVal : T[Prop]) => void;
} // here we used <string  &  Prop> cuz the onReleasedChange prop is of type number and onNameChange is of type string
// for onNameChange and OnReleasedChange props below we use ` `
// lets say we need OnNameDelete then just add another as &
& {
    [Prop in keyof T as `on${Capitalize<string  &  Prop>}Delete`]?: () => void;
}

function listenObject<T>(obj: T, listeners: Listeners<T>): void {
    throw "Needs to be implemented"
}

const DataObj: GamesList= {
name: "Battlefield1",
released:2020
}

type GameDataListeners = Listeners<GamesList>

listenObject(DataObj, {
    onNameChange: (v: string) => {}, // here if Listeners is not set as `---` then this prop wont be on GameDataListeners and show error    
    onReleasedChange: (v: number) => {},
    onNameDelete: () => {},
    onReleasedDelete: () => {}
})