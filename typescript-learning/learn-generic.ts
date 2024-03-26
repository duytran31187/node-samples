const combinePair = <T, U>(first: T, second: U): [T, U] => {
    return [first, second];
};
let pair1 = combinePair(10, "Hello");
console.log(pair1);
console.log(combinePair(10, 10));
console.log(combinePair(10, 10));


function combineParams<S>(p1:S, p2: S): void {
	console.log([p1, p2]);
}
combineParams(10, 20);
combineParams("Hello", "World");