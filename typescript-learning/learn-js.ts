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