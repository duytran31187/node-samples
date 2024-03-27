// A JavaScript Set is a collection of unique values.
let letters = new Set();
letters.add("a");
letters.add("b");
letters.add("b"); // cant add duplicate value
letters.add("b");
letters.add("c");
console.log(letters.size);
letters.delete("b");

letters.forEach((letter) => {
    console.log(letter);
});
console.log(letters.has("a"));
console.log(letters.values());

//A Map holds key-value pairs where the keys can be any datatype.

console.log(`-----------MAP---`);


let students = new Map();
students.set("John", 80);
students.set("Jane", 95);
students.set("Jane", 100); // overwrite
console.log(students.size);
console.log(`jana score: ${students.get("Jane")}`);

// Create a Map
const fruits = new Map([
    ["apples", 500],
    ["bananas", 300],
    ["oranges", 200]
  ]);
  
console.log(fruits.size);
console.log(`apples: ${fruits.get("apples")}`);  