interface Name {
    first: string;
    last: string;
}

// here the return type  uses a & to return two types of results
function getFullName (name: Name) : Name & {fullName: string} {
    return {
        ...name,
        fullName: `${name.first} ${name.last}`
    }
}


// here parameter is a function throws error until the T of the PermuteRows extends 
// a function type that is the most generic type function that any function will be satiesfied
function PermuteRows<T extends (...args: any[]) => any> (interatorFunc: T, data: Parameters<T>[0][]): ReturnType<T>[]{
    return data.map(interatorFunc)
}


console.log(PermuteRows(getFullName, [{first: "Satish", last: "Rajnale"}]));