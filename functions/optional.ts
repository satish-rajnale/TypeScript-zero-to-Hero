function cooking(quantity: string, ingredients: string, extra?: string): string {
    return `${quantity} of ${ingredients} ${extra ? extra : "" }`
}

console.log(cooking("5", "melon"));
console.log(cooking("10", "tea", "lemon"));

import User from "../interfaces/interface";

function sendUser(user: User): string{
    if(user){
        return  user.auth!.email! 
    }
   return ""
}

function  sendUserEasily(user: User): string{
    return user?.auth?.email ?? user.name
}

console.log(sendUser({name: "mary"}));
console.log(sendUserEasily({name: "jack", auth:{email:"asdasd"}}));
