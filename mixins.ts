function myLogFunction() {
    return (str: string) => {
        console.log(str)
    }
}

const logger = myLogFunction();
logger("ABBBA")


function thatCreatesAClass() {
    return class MyLoogerClass {
        private completeLog: string = "";

        createLog(str: string){
         
            this.completeLog += str + "\n";
        }

        dumpLog(){
            return this.completeLog
        }
    }
}

const myLogger = thatCreatesAClass();
// now the return of thatCreatesAClass is stored inside myLogger  i.e a class

const myclass = new myLogger();
myclass.createLog("AnimeMaou");
console.log(myclass.dumpLog()) 


myclass.createLog("is the best");
console.log(myclass.dumpLog());


function CreateSimpleDatabase<T>() {
    return class SimpleMemoryDatabase {
        private DB : Record<string, T> = {};

        set(id: string , value: T){
            this.DB[id] = value
        }

        get(id: string): T {
            return this.DB[id]
        }

        getObject(): {} {
            return this.DB
        }
    }
}

const stringDatabase = CreateSimpleDatabase<string>();

const smallDB = new stringDatabase();

smallDB.set("1", "Berserk");
console.log(smallDB.get("1"));
smallDB.set("2", "Hataraku Maou")
console.log(smallDB.getObject());
