type Person = {
    firstName: string;
    lastName: string;
    age: number;
    isAdult: boolean;
    hobbies?: string[];
}

type programmingLanguage = 'javascript' | 'typescript' | 'python' | 'java' | 'c#' | 'php';

interface DeveloperRole {
    programmingLanguage: programmingLanguage;
    isFrontEndDeloper(): boolean;
    isBackEndDeloper(): boolean;
}
enum DevRoles {
    SENIOR = 'SENIOR',
    JUNIOR = 'JUNIOR',
    MIDDLE = 'MIDDLE',
    LEADER = 'LEADER'
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
    
    constructor(person: Person, workingTime: number, programmingLanguage: programmingLanguage, company: string, devRole?: DevRoles) {
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
        return ['javascript', 'typescript'].includes(this.programmingLanguage);
    }
    isBackEndDeloper(): boolean {
        return ['java', 'c#', 'php'].includes(this.programmingLanguage);
    }
}

const persion1 = new FptDeveloperModel({firstName: 'John', lastName: 'Don', age: 20, isAdult: true}, 8, 'javascript', 'FPT Software', DevRoles.JUNIOR);
const persion2 = new FptDeveloperModel({firstName: 'evan', lastName: 'David', age: 30, isAdult: true}, 8, 'javascript', 'abc');

// function as types
function add(a: number, b: number): number {
    return a + b;
}
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
addAndHandle(
    10,
    20,
    (result) => {
        console.log(`Result is ${result}`);
    }
);
addAndHandle(
    10,
    10,
    printResult
);