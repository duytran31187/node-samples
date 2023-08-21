function WithFuel(target: typeof Rocket, context): typeof Rocket {
    if (context.kind === "class") {
      console.log(`init class`)  
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

//   @WithFuel
//   class Car {
//     fuel: number = 10
//   }
  
  const rocket = new Rocket()
//   const car = new Car()
  console.log(rocket.fuel)
  console.log(`Is the rocket empty? ${(rocket as any).isEmpty()}`)
//   console.log((car as any).fuel)
  // prints 50