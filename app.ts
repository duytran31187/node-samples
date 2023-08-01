import {Addition, Substraction} from './simpleModule';
require('dotenv').config();
// compile module: npx tsc --module commonjs app.ts
let addObject = new Addition(10, 20);   
let subObject = new Substraction(20, 10);  
  
addObject.Sum();  
subObject.Substract();

console.log(`process object ${JSON.stringify(process.env)}`);
console.log(`env name ${process.env.USER_NAME} email ${process.env.USER_EMAIL}`);