// const beforeLoad = "beforeLoad";
// const loading = "loading";
// const loaded = "loaded";

enum LoadingState {
 beforeLoad = "beforeLoad",
loading = "loading",
 loaded = "loaded"
}

const isLoading = (state: LoadingState) => state === LoadingState.loading;

console.log(isLoading(LoadingState.beforeLoad));

const engLoadingState = {
    [LoadingState.beforeLoad]: "Before Load" 
};

// function rollDice(dice: number): number {
//     let pip= 0;
//     for(let i = 0; i< dice; i++){
//         pip += Math.floor(Math.random() * 5) + 1;
//     }
//     return pip;
// };

// console.log(rollDice(4))

//variant
function rollDice(dice:1 |2 |3): number {
    let pip= 0;
    for(let i = 0; i< dice; i++){
        pip += Math.floor(Math.random() * 5) + 1;
    }
    return pip;
};
console.log(rollDice(3));// only val between 1, 2, 3 accepted


function sendEvent(name: "checkout", data: {"count": number}) : void;
function sendEvent(name: "addToCart", data: {"id": number}) : void;
function sendEvent(name: string, data: unknown) : void{
    console.log(`${name}: ${JSON.stringify(data)}`)
}

sendEvent("checkout", {count: 2});