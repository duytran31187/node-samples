function getItems(items: any[]): any[] {
    return new Array().concat(items);
}
let myNumArr = getItems([10, 20, 30]);  
let myStrArr = getItems(["Hello", "JavaTpoint"]);  
myNumArr.push(40); // Correct  
myNumArr.push("Hello TypeScript"); // Correct  
myStrArr.push("Hello SSSIT"); // Correct  
myStrArr.push(40); // Correct  
console.log(myNumArr); // [10, 20, 30, 40, "Hello TypeScript"]  
console.log(myStrArr); // ["Hello", "JavaTpoint", "Hello SSSIT", 40] 
console.log(`with gEneric`);

function getGenericItems<T>(items: T[]): T[] {
    return new Array().concat(items);
}
let numArr = getGenericItems<number>([10, 20, 30]);  
let strArr = getGenericItems<string>(["Hello", "JavaTpoint"]);  
numArr.push(40); // Correct  
// numArr.push("Hello TypeScript"); // Compilation Error  
strArr.push("Hello SSSIT"); // Correct  
// strArr.push(40); // Compilation Error  
console.log(numArr); // [10, 20, 30, 40, "Hello TypeScript"]  
console.log(strArr); // ["Hello", "JavaTpoint", "Hello SSSIT", 40] 

//sample with multi-type variables
function displayDataType<T, U>(id:T, name:U): void {   
    console.log("DataType of Id: "+typeof(id) + "\nDataType of Name: "+ typeof(name));    
  }  
displayDataType<number, string>(101, "Abhishek");  