enum Gender {
    MALE,
    FEMALE,
    NON_BINARY
}

export const allCaps = (target: any, propertyKey: string, descriptor: PropertyDescriptor) => {
    const originalMethod = descriptor.value;
    descriptor.value = function (...args: any[]) {
        const result = originalMethod.apply(this, args);
        return `${result.toUpperCase()}`;
    };
}

export function scream(prefix: string): Function {
    return function (target: any, propertyKey: string, descriptor: PropertyDescriptor) {
        const originalMethod = descriptor.value;
        descriptor.value = function (...args: any[]) {
            const result = originalMethod.apply(this, args);
            return `${prefix} ${result.toUpperCase()}`;
        };
    };
}

export const asDays = (target: any, memberName: string, descriptor: PropertyDescriptor) => {
    const originalMethod = descriptor.value;
    descriptor.value = function (...args: any[]) {
        const result = originalMethod.apply(this, args);
        return result * 365;
    };
}

export const asAbbreviation = (target: any, memberName: string, descriptor: PropertyDescriptor) => {
    const originalMethod = descriptor.value;
    descriptor.value = function (...args: any[]) {
        const result = originalMethod.apply(this, args);
        switch (result) {
            case Gender.MALE:
                return 'M';
            case Gender.FEMALE:
                return 'F';
            case Gender.NON_BINARY:
                return 'N';
        }
    };
}

/***************************************
 * This is a method decorator that adds before
 * and after logging behavior to a decorated method
 * @param target, the class the contains the decorated method
 * @param propertyKey, the name of the decorated method
 * @param descriptor, has the following properties:
 *                    • writable: boolean
 *                    • enumerable: boolean
 *                    • configurable: boolean
 *                    • value: Function, is the behavior of the method
 *                    • Object, is the base TypeScript object from which the
 *                      the class is derived
 */
export const log = (target: any, propertyKey: string, descriptor: PropertyDescriptor) => {
    // Capture the functional behavior of the decorated method
    const originalMethod = descriptor.value;
    // Override the decorated method's behavior with new behavior
    descriptor.value = function (...args: any[]) {
        let msg: string;
        // The decorated method's parameters will be passed in as args.
        // We'll assume the decorated method might only have a single parameter,
        // check to see if it's been passed in the method
        if (args[0]) {
            msg = (`${propertyKey}, that has a parameter value: ${args[0]}`)
        } else {
            msg = `${propertyKey}`
        }
        // Emit a message to the console
        console.log(`Logger says - calling the method: ${msg}`);
        // Execute the behavior originally programmed in
        // the decorated method
        const result = originalMethod.apply(this, args);
        // if the decorated method returned a value when executed,
        // capture that result
        if (result) {
            msg = `${propertyKey} and returned: ${JSON.stringify(result)}`;
        } else {
            msg = `${propertyKey}`;
        }
        // Having executed the decorated method's behavior, emit
        // a message to the console report what happened
        console.log(`Logger says - called the method: ${msg}`);
        return result;
    };
    return descriptor;
};