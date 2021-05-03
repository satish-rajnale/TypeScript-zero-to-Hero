
export function printToFile(text : string , callback: () => void): void{
    console.log(text);
    callback();
}

console.log(printToFile("Hello", () => {}))


export type myMutateFunc = (a: number) => number
export function arrayMutation(arr : number[], mutate :myMutateFunc ): number[]{
  return arr.map(mutate);
}

console.log(arrayMutation([1,2,3], (v) => v+10 ))


// closure in js & ts

type adder = (a: number) => number
export function createAdder(num : number): adder{
    return (val: number) => num+ val;
}

const addOne = createAdder(1);
console.log(addOne(30))
