import { log, allCaps } from './decorators';
// note: npx tsc learning-decorator.ts --target ES5 --emitDecoratorMetadata --experimentalDecorators && node learning-decorator.js
class Printer {
    @allCaps
    print(value: string) {
        console.log(value);
        const formattedValue =  "hello "+ value;
        return formattedValue;
    }
}
const printer = new Printer();
const str =printer.print('Decorators are cool!');
console.log(`str ${str}`);