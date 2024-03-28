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
