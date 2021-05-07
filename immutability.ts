interface Cat {
    name: string;
    breed: string;
}

type ReadonlyCat = Readonly<Cat>; 

function getCat(name:string, breed: string): Cat {
    return {name, breed}
}

const jaco = getCat("jaco", "tiger");
jaco.name  = "asdasd" // string is mutable and not safe

function nonChange(name:string, breed: string): ReadonlyCat { // or here you can use Readonly<Cat> directly without creating a TYPE
    return {name, breed}
}

const nai = nonChange("jaco", "tiger");
// nai.name  = "asdasd" this is now cant be done


// with tuples
function makeCordinate (x:number, y:number, z:number): readonly[number,number, number]{
    return [x,y,z]
}

const c1 = makeCordinate(1,3,2);
// c1[0] = 23; // mutable cordinates

const reallyConst = [1,2,3] as const;
// reallyConst[0] = 50 without as const type this line executes fine
