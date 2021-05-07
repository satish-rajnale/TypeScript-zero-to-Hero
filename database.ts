// typescript classes, Member visibility & implements

// alot of time people are asked to implement a in memory nosqldb/  databse structure

interface Database{
    get(id:string): string;
    set(id:string, value:string): void;
}

// persistable means you can read & write to your state through a string
interface Persistable {
 saveToString(): string;
 restoreFromString(stroredState: string):void
}




class InMemoryDatabase implements Database {
//   private  
protected db: Record<string, string> = {};
    
    get(id: string): string {
        return this.db[id]
    };
    set(id:string, value:string): void{
        this.db[id] = value
    }

}

const myDB = new InMemoryDatabase();

myDB.set("name", "Allen");
//myDB.db["gk"] = "Gomo" // db is not private this statement will execute
//console.log(myDB.get("gk"));


class PersitableDatabase extends InMemoryDatabase implements Persistable{
    saveToString(): string{
        return JSON.stringify(this.db); // if db is private wont be accessible here even if class extends
    }
    restoreFromString(stroredState: string):void {
        this.db = JSON.parse(stroredState)
    }
}


const myPersistantDB = new PersitableDatabase();

myPersistantDB.set("name", "Allen");
console.log(myPersistantDB.saveToString());

const savedState = myPersistantDB.saveToString();

const myDB2 = new PersitableDatabase();
myDB2.restoreFromString(savedState);

console.log(myDB2.get("name"))


