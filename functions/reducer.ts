function myForEach<T>(items: T[], forEachFunc: (v: T) => void): void {
  //   let val =
  items.reduce((acc, val) => {
    forEachFunc(val);
    return null;
  }, null);
  // return val;
}

myForEach(["a", "b", "c"], (v) => console.log(`forEach ${v}`));

function myFilterer<T>(items: T[], filterFunc: (v: T) => boolean): T[] {
  return items.reduce(
    (acc, val) =>  filterFunc(val) ? [...acc, val] : acc,
    [] as T[]
  );
}

console.log(myFilterer([1,2,3,4,5,6,7,8], (v) => v%2 === 0));

function myMap<T, K>(items: T[], mapFunc: (v: T)=> K):K[]{
    return items.reduce((acc, val)=> { return [...acc, mapFunc(val)] }, [] as K[])// here [] dependancy throws error in strict mode use (  [] as K[] )
};

console.log(myMap([1,2,3,4,5,6], (v) => (v*10).toString() ))