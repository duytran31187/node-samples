import {Addition, Substraction} from './simpleModule';
// compile module: npx tsc --module commonjs app.ts
let addObject = new Addition(10, 20);   
let subObject = new Substraction(20, 10);  
  
addObject.Sum();  
subObject.Substract();  