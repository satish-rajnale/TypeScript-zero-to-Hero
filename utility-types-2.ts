interface Name {
  first: string;
  last: string;
}

// here the return type  uses a & to return two types of results
function getFullName(name: Name): Name & { fullName: string } {
  return {
    ...name,
    fullName: `${name.first} ${name.last}`,
  };
}

// here parameter is a function throws error until the T of the PermuteRows extends
// a function type that is the most generic type function that any function will be satiesfied
function PermuteRows<T extends (...args: any[]) => any>(
  interatorFunc: T,
  data: Parameters<T>[0][]
): ReturnType<T>[] {
  return data.map(interatorFunc);
}

console.log(PermuteRows(getFullName, [{ first: "Satish", last: "Rajnale" }]));


// class implementation of above same

class PersomnWithFullNameAndSkill {
  constructor(public name: Name) {}

  get fullNameWithSkill() {
    return `${this.name.first} ${this.name.last} draws`;
  }
}

function createObjects<T extends new (...args: any[]) => any>(
  ObjectType: T,
  data: ConstructorParameters<T>[0][]
): InstanceType<T>[] {
  return data.map((item) => new ObjectType(item));
}

// now createObjects wont accept getFullNmae bcoz it does not have a constructor and therefore cant be extended as a new
//console.log(createObjects(getFullName, [{ first: "Satish", last: "Rajnale" }]));


console.log(createObjects(PersomnWithFullNameAndSkill, [{ first: "Satish", last: "Rajnale" }]));
console.log(createObjects(
    PersomnWithFullNameAndSkill, [{ first: "Satish", last: "Rajnale" }])
    .map(obj => obj.fullNameWithSkill));
