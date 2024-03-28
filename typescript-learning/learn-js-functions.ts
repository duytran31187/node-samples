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
