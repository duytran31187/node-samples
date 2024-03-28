// In JavaScript all functions are object methods.

// The call() method is a predefined JavaScript method.
// With call(), an object can use a method belonging to another object.
const person = {
  fullName: function (): string {
    return this.firstName + " " + this.lastName;
  },
  address: function(city: string, country: string): string {
    return this.firstName + " " + this.lastName + " lives in " + city + ", " + country;
  }
};
const person1 = {
  firstName: "John",
  lastName: "Doe",
};
const person2 = {
  firstName: "Mary",
  lastName: "Doe",
};

console.log(`person.fullName.call(person1): ${person.fullName.call(person1)}`);
console.log(`person.address.call(person1): ${person.address.call(person1, 'Hanoi', 'Vietnam')}`);

// With the apply() method, you can write a method that can be used on different objects.
// The apply() method is similar to the call() method (previous example).
// The difference is:
// The call() method takes arguments separately.
// The apply() method takes arguments as an array.
console.log(`person.fullName.apply(person1): ${person.fullName.apply(person1)}`);
console.log(`person.address.apply(person1): ${person.address.apply(person1, ['Hanoi', 'Vietnam'])}`);

// Since JavaScript arrays do not have a max() method, you can apply the Math.max() method instead.
console.log(`find max value of an array ${Math.max.apply(null, [1, 2, 3, 4, 5])}`); // The first argument (null) does not matter. It is not used in this example.


// With the bind() method, an object can borrow a method from another object.
console.log(`---------------------BIND---------------------`);
  
const member = {
firstName:"Hege",
lastName: "Nilsen",
}
  
console.log(`member borrowed fullName from person: ${person.fullName.bind(member)()}`); // have to invoke after bind
// Sometimes the bind() method has to be used to prevent losing this.
// When a function is used as a callback, this is lost.
const person5 = {
firstName:"John",
lastName: "Doe",
display: function () {
    console.log(`demo bind: ${this.firstName} ${this.lastName}`);
}
}
console.log(`as used as callback, this is lost`);
setTimeout( person5.display, 1000); // as used as callback, this is lost
console.log(`as used as callback, this is lost, have to bind to prevent losing this`);
setTimeout(person5.display.bind(person5), 2000); // have to bind to prevent losing this

// closure
console.log(`---------------------CLOSURE---------------------`);
const addFunc = (function () {
    let counter = 0;
    return function () {
        counter += 1; return counter;}
})();
console.log(`addFunc: ${addFunc()}`); // first time call, initialize counter = 0, then return a function that increase counter by 1, it self invoke the function. currently, addFunc = funtion() {return counter +=1}
console.log(`addFunc: ${addFunc()}`); // invoke the function to increase counter by 1 - on second call there's no declare line: let counter=0
console.log(`addFunc: ${addFunc()}`);
console.log(`addFunc: ${addFunc()}`);