Setup: install typescript in local
- After creating a ts file, ex: abc.ts
- To compile the typescript file, need to run the command: 
```bash
tsc abc.ts
```
# some definitions 
1 module: any js files without import, export or top-level awais should be considered as as script not a module. so if any script that want to be treated as a module we can add the below script
```javascript
export {}
```
 - TypeScript has ES Module syntax means: use Import && Exort
 - CommonJS is the format which most modules on npm are delivered in => means: use module.exports && require
 - The core primitive types in TypeScript are all lowercase! (string, number, boolean)
 - function as type: base on declaration input params and output samples
 - callback functions can return something, even if the argument on which they're passed does NOT expect a returned value


 #issues
 1. "Unable to resolve signature of class decorator when called as an expression. The runtime will invoke the decorator with 1 arguments, but the decorator expects 2." => to sort: remove experimentalDecorators from tsconfig.json