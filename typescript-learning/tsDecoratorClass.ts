// To run: npx tsc tsDecoratorClass.ts && node tsDecoratorClass.js

function WithFuel(target: typeof Rocket, context): typeof Rocket {
  console.log(`context: ${JSON.stringify(context)}`);
    if (context.kind === "class") {
      console.log(`decorating class ${target.name}`);
      return class extends target {
        // fuel: number = 50
        isEmpty(): boolean {
          return this.fuel == 0
        }
      }
    }
  }
  @WithFuel
  class Rocket {
    fuel: number = 75
  }

  @WithFuel
  class Car {
    fuel: number = 10
  }
  
  const rocket = new Rocket()
  const car = new Car()
  console.log(`is fuel empty? ${(rocket as any).isEmpty()}`);
  // console.log(`Is the rocket empty? ${(rocket as any).isEmpty()}`)
  // console.log(car.fuel)
