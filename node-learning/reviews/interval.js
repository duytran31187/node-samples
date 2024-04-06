var count = 0
// just do 5 times
const intervalId = setInterval(() => {
  console.log('Hello, world! ' + count);
  count++;
  if(count === 5) {
    clearInterval(intervalId);
  }
}, 1000);
