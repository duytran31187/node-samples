import {Addition, Substraction} from './simpleModule';
require('dotenv').config();
// compile module: npx tsc --module commonjs app.ts
// to run file by 1 one 2 commands:
// 1.without ts-node: npx tsc app.ts && node app.js
// 2. with ts-node: ts-node app.ts
let addObject = new Addition(10, 20);   
let subObject = new Substraction(20, 10);  
  
addObject.Sum();  
subObject.Substract();

console.log(`process object ${JSON.stringify(process.env)}`);
console.log(`env name ${process.env.USER_NAME} email ${process.env.USER_EMAIL}`);