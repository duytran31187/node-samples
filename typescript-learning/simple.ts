class Product {
    private isListed: boolean;
    constructor(public name: string, public price: number) {
        this.isListed = true;
    }
}
const product = new Product("Laptop", 1000);
console.log(`Product: ${JSON.stringify(product)}`);
console.log(`debugging type of product: ${typeof Product}`);