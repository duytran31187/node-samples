
// The Nullish Coalescing Operator (??)
let sampleName = null;
let text = 'Default value';
let result = sampleName ?? text; // result = text, explain: if sampleName is null or undefined, result will be assigned with text value, otherwise, result will be assigned with sampleName value

// The Optional Chaining Operator (?.)
type Computer = {
  name: string;
  price: number;
  brand?: string;
  warranty?: number;
};
const firstPC: Computer = {
  name: 'PC1',
  price: 1000,
  brand: 'Dell',
};
console.log(`first pc has waranty time is ${firstPC?.warranty}`); // if firstPC.warranty is null or undefined, the result will be undefined, otherwise, the result will be the value of firstPC.warranty
//sample tuple type: there 3 elements in the tuple: location, timeStamp, name, each element has its own type
type TupleData = [
  location: Location,
  timeStamp: number,
  name: string,
];


type Person = {
  firstName: string;
  lastName: string;
  age: number;
  isAdult: boolean;
  hobbies?: string[];
};

type programmingLanguage =
  | "javascript"
  | "typescript"
  | "python"
  | "java"
  | "c#"
  | "php";

interface DeveloperRole {
  programmingLanguage: programmingLanguage;
  isFrontEndDeloper(): boolean;
  isBackEndDeloper(): boolean;
}
enum DevRoles {
  SENIOR = "SENIOR",
  JUNIOR = "JUNIOR",
  MIDDLE = "MIDDLE",
  LEADER = "LEADER",
}
interface FptStaff {
  company: string;
  personInfo: Person;
  Role?: DevRoles;
}
interface FptDeveloper extends DeveloperRole, FptStaff {
  workingtime: number;
}

class FptDeveloperModel implements FptDeveloper {
  personInfo: Person;
  workingtime: number;
  programmingLanguage: programmingLanguage;
  company: string;
  Role?: DevRoles;

  constructor(
    person: Person,
    workingTime: number,
    programmingLanguage: programmingLanguage,
    company: string,
    devRole?: DevRoles
  ) {
    this.personInfo = person;
    this.workingtime = workingTime;
    this.programmingLanguage = programmingLanguage;
    this.company = company;
    this.Role = devRole;
  }
  isAdult(): boolean {
    return this.personInfo.isAdult;
  }
  isFrontEndDeloper(): boolean {
    return ["javascript", "typescript"].includes(this.programmingLanguage);
  }
  isBackEndDeloper(): boolean {
    return ["java", "c#", "php"].includes(this.programmingLanguage);
  }
}

const persion1 = new FptDeveloperModel(
  { firstName: "John", lastName: "Don", age: 20, isAdult: true },
  8,
  "javascript",
  "FPT Software",
  DevRoles.JUNIOR
);
const persion2 = new FptDeveloperModel(
  { firstName: "evan", lastName: "David", age: 30, isAdult: true },
  8,
  "javascript",
  "abc"
);

// function as types
interface AddFn {
  (a: number, b: number): number;
}
type AddFnType = (a: number, b: number) => number;
let add: AddFn; // or we can declare as let add: AddFnType
add = (n1: number, n2: number) => {
  return n1 + n2;
};
// function add(a: number, b: number): number {
//   return a + b;
// }
function substract(a: number, b: number): number {
  return a - b;
}

function printResult(num: number): void {
  console.log(`Result is ${num}`);
}
let combineValues: (a: number, b: number) => number;
combineValues = add;
console.log(combineValues(8, 8));
combineValues = substract;
console.log(combineValues(8, 8));
// combineValues = printResult;  // compilation error:Type 'void' is not assignable to type 'number'

/**
 * addAndHandle is a function receives 3 parameters: the first 2 are numbers, the last one is a function receives a number and return void
 * @param a
 * @param b
 * @param callbackFunc
 */
function addAndHandle(
  a: number,
  b: number,
  callbackFunc: (result: number) => void
) {
  const result = a + b;
  callbackFunc(result);
}
addAndHandle(10, 20, (result) => {
  console.log(`Result is ${result}`);
});
addAndHandle(10, 10, printResult);

function sendRequest(data: string, cb: (response: any) => void) {
  // ... sending a request with "data"
  return cb({ data: "Hi there!" });
}

sendRequest("Send this!", (response) => {
  console.log(response);
  return true;
});

// Rest operator
const addUnlimitedNumbers = (...numbers: number[]) => {
  return numbers.reduce((curResult, curValue) => {
    return curResult + curValue;
  }, 0)
}
console.log(addUnlimitedNumbers(1, 2, 3, 4, 5, 6, 7, 8, 9, 10));
console.log(addUnlimitedNumbers());

// Array && object destructuring
const hobbies = ['Sports', 'Cooking'];
const [hobby1, hobby2] = hobbies;
console.log(`hobby1: ${hobby1}, hobby2: ${hobby2}`);
const sampleObject = {first: 1, second: 2, third: 3, fourth: 4, fifth: 5};
const {first, second, third: thirdParam} = sampleObject; // first, second must match the key of the object, thirdParam is the alias of the key
console.log(`first: ${first}, second: ${second} third ${thirdParam}`);


// Function Rest Parameter: The rest parameter (...) allows a function to treat an indefinite number of arguments as an array
function sum(...theArgs) {
  return theArgs.reduce((previous, current) => {
    return previous + current;
  });
}
console.log(`rest params: ${sum(1, 2, 3)}`);