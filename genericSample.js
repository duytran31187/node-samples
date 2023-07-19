function getItems(items) {
    return new Array().concat(items);
}
var myNumArr = getItems([10, 20, 30]);
var myStrArr = getItems(["Hello", "JavaTpoint"]);
myNumArr.push(40); // Correct  
myNumArr.push("Hello TypeScript"); // Correct  
myStrArr.push("Hello SSSIT"); // Correct  
myStrArr.push(40); // Correct  
console.log(myNumArr); // [10, 20, 30, 40, "Hello TypeScript"]  
console.log(myStrArr); // ["Hello", "JavaTpoint", "Hello SSSIT", 40] 
console.log("with gEneric");
function getGenericItems(items) {
    return new Array().concat(items);
}
var numArr = getGenericItems([10, 20, 30]);
var strArr = getGenericItems(["Hello", "JavaTpoint"]);
numArr.push(40); // Correct  
// numArr.push("Hello TypeScript"); // Compilation Error  
strArr.push("Hello SSSIT"); // Correct  
// strArr.push(40); // Compilation Error  
console.log(numArr); // [10, 20, 30, 40, "Hello TypeScript"]  
console.log(strArr); // ["Hello", "JavaTpoint", "Hello SSSIT", 40] 
//sample with multi-type variables
function displayDataType(id, name) {
    console.log("DataType of Id: " + typeof (id) + "\nDataType of Name: " + typeof (name));
}
displayDataType(101, "Abhishek");
