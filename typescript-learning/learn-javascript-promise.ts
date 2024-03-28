
// A Promise is a JavaScript object that links "Producing Code" and "Consuming Code".
// "Producing Code" can take some time and "Consuming Code" must wait for the result. 
// Producing code can be anything, like reading a file, fetching data from a server, etc.
// producing code just return a promise object once it is done. NOT RETURN MANY TIMES

const myPromise = new Promise((resolve, reject) => {
    setInterval(() => {
        resolve('Promise is resolved at ' + new Date().toLocaleTimeString());
    }, 1000);
});

myPromise.then((data) => {
    console.log(`Promise is resolved with data: ${data}`);
});

// setInterval(() => {
//     console.log('Timer interval at ' + new Date().toLocaleTimeString());
// }, 1000);