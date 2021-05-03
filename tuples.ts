type ThreeDCordinate = [x: number, y:number, z: number];

function addCordinate(c1: ThreeDCordinate, c2: ThreeDCordinate): ThreeDCordinate {
    return [ c1[0] + c2[0],c1[1] + c2[1],c1[2] + c2[2]   ]
}

console.log(addCordinate([1,2,3], [22,33,44]));

function simpleStringState(initial : string) : [() => string, (v: string) => void]{
    let str : string = initial;
    return [
        () => str,
        (v: string) => {str = v;}
    ]
};

const [myString, setMyString] = simpleStringState("change me");

console.log(myString());
setMyString("<< changed >>")
console.log(myString());
