import { performance } from "perf_hooks";
import "reflect-metadata";


const delay = <T>(time: number, data: T): Promise<T> => 
        new Promise((resolve) => {
            setTimeout(()=>{
                resolve(data)
            }, time);
        });


 @logTimings //class decorator       
class Users {
    @timing() // using method level decorator
    async getUsers(){
        return await delay(1000, []);
    };
    @timing()
    async getUser(id: number){
        return await delay(50, {
            id: `user:${id}`
        })
    };
};

(async function(){
    const users = new Users();

    const user = await users.getUser(22);
    console.log(`Get ${JSON.stringify(user)}`);

    await users.getUser(42);
    await users.getUsers();
    // @ts-ignore
    console.log(users.__timings);
    //the output will be:
    // [
    //     { method: 'getUser', time: 50.11400008201599 },
    //     { method: 'getUser', time: 52.10790014266968 },
    //     { method: 'getUsers', time: 1000.196799993515 }
    //   ]
    //timings with the called method name
})();

interface ThisWithTimings {__timings : unknown[]}
//this is a method level decorator
function timing() {
    return function(target: any, propertyKey: string, descriptor: PropertyDescriptor){
        const value = descriptor.value;
        descriptor.value = async function (...args : any[]){
            const start = performance.now();
            const out = await value.apply(this, args);
            const end = performance.now();
            // coarsing this as typesript doesnt know if it has __timings on this
            if((this as ThisWithTimings).__timings){
                (this as ThisWithTimings).__timings.push({
                    method:propertyKey,
                    time : end -start 
                });

            }else{
                console.log(end - start);
            }

            return out;
        }
    }
};

// class decorator
function logTimings<T extends { new (...args: any[]): {}}>(constructor: T) {
    return class extends constructor{
        __timings= [];
    };
};


const requiredMetaDataKey = Symbol("important");

export function important(
    target: Object,
    propertyKey: string | symbol,
    parameterIndex: number
    ){
        let existingrequiredparameters: number[] = 
            Reflect.getOwnMetadata(requiredMetaDataKey, target, propertyKey) || [];

            existingrequiredparameters.push(parameterIndex);
            Reflect.defineMetadata(
                requiredMetaDataKey,
                existingrequiredparameters,
                target,
                propertyKey
            )
    }