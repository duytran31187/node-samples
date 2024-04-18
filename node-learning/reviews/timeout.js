// If you specify the timeout delay to 0, the callback function will be executed as soon as possible, but after the current function execution:
setTimeout(() => {
    console.log('timeout console log ');
}, 0);
  
  console.log(' before ');
  console.log(' before 1');
  console.log(' before 2');
  console.log(' before 3');
  setImmediate(() => {console.log('setImmediate console log')});

  console.log(' before 4');
  console.log(' before 5');
  console.log(' before 6');
  console.log(' before 7');
  