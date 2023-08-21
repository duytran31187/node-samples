const fs = require('fs/promises');
import * as buffer from "buffer";
// command: npx tsc readFileAsync.ts && node readFileAsync.js
// read file synchronously

async function readLogFile() {
  try {
    const data = await fs.readFile('tmp/application.log', { encoding: 'utf8' });
    // console.log(`log data %o`, data);
    return data;
  } catch (err) {
    console.log(`error %o`, err);
  }
}

readLogFile().then((data) => {
  console.log(`log data %o`, data);
}).catch((err) => { console.log(`error caught %o`, err)})

console.log('This line called before reading it means readFile not block this line');