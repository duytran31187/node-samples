class PersonClass {
    private static instance: PersonClass;
    private id;

    constructor(
        private _firstName: string,
        private _lastName: string,
        private _age: number,
    ) {
        this.id = Math.random();
    }
    
    static getInstance(firstName: string, lastName: string, age: number) {
        if (!PersonClass.instance) {
            PersonClass.instance = new PersonClass(firstName, lastName, age);
        }
        return PersonClass.instance;
    }
}
console.log(`[John]singleTon PersonClass ${JSON.stringify(PersonClass.getInstance("John", "Doe", 20))}`);
console.log(`[Duy] singleTon PersonClass ${JSON.stringify(PersonClass.getInstance("Duy", "Tran", 20))}`);