# TypeScript-zero-to-Hero
 Typescript all use cases and definations that I learn

Typescript as the name suggests adds types to your code. 
For example : javascript is not a type defined language but by using typescript we can make js code also type defined.

Typescript is not only limited to javascript. You can use it with language or framework to make your code more robust and bug free.
Typescript aims at providing long term gain for small constribution in type defining your code.


Typescript can be added by using npm and including a typeconfig.js file in you project files.Just make sure anything you use like react or node or any external modules must have a proper supportive type defined dependancy added in package.json file.

>Some libraries (e.g. Axios) provide a wrapper function that is already defined as it willl return a data variable as a JSON. But maybe if your response is also gives you a data parameter that has different values you want. Supppose the response you get from server is like this 
```json
data: {
  data : {
    ...actual information
  }
}
```
>then typescript does not allows a different data variable accessed from that response in strict mode. 
