interface User {
  name: string;
  id: number;
  email?: string;
  password?: string;
}

//Notice now you have to define password also in UserOptionals if you want it to be editable but
// doing it every time is redundant and the code is not DRY
// interface UserOptionals {
//     name?:string;
//     id?: string;
//     email?: string;
// }

// so use utility "type" provided called "Partial" like this
// note it wont work with interface
type UserOptionals = Partial<User>;

const merge = (user: User, optionals: UserOptionals): User => {
  return {
    ...user,
    ...optionals,
  };
};

console.log(merge({ name: "satish", id: 1, email: "asd@gmail.com" }, {}));
// because all the fields in UserOptionals are optional you may or may not provide params like {}
// output: { name: 'satish', id: '21', email: 'asd@gmail.com' }
console.log(
  merge(
    { name: "satish", id: 2, email: "asd@gmail.com" },
    { name: "someone", email: "noreply@gmail.com" }
  )
);
// after O/p: { name: 'someone', id: '21', email: 'noreply@gmail.com' }

type RequiredUser = Required<User>; // This removes any optionals (?) from the given iterface

type JustEmailandName = Pick<User, "email" | "name">;
// New type where you can pick your keys from the interface and their
// optionality is preserved i.e email? is there unlike in Required

const emailName = (items: JustEmailandName): JustEmailandName => {
  return items;
};

console.log(emailName({ name: "ads" }));
// output : { name: 'ads' } you can provide both also name & email

// Record <Key, yourOutputeType>
const mapById = (users: User[]): Record<number, User> => {
  return users.reduce((acc, val) => {
    return {
      ...acc,
      [val.id]: val,
    };
  }, {});
};

console.log(
  mapById([
    { id: 1, name: "sea" },
    { id: 2, name: "salt" },
  ])
);
// output: { '1': { id: '1', name: 'sea' }, '2': { id: '2', name: 'salt' } };
// note here we have same id pointing to a obj with same id

// you can use Omit<myType, key> this will omit the key but the logic you have to apply
type UserWithoutId = Omit<User, "id">;


// const omitId = --//-- Record<string,--//--> => { // this also works
const omitId = (users: User[]): Record<User["id"], Omit<User, "id">> => {
    return users.reduce((acc, val) => {
    const {id, ...data} = val;
      return {
        ...acc,
        [id]: data,
      };
    }, {});
  };

  console.log(
    omitId([
      { id: 17, name: "beach" },
      { id: 21, name: "mountain" }
    ])
  );
  // output: { '17': { name: 'beach' }, '21': { name: 'mountain' } }