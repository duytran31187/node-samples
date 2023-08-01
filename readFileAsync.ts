import * as fs from "fs";
import * as buffer from "buffer";
// command: npx tsc readFileAsync.ts && node readFileAsync.js
// read file synchronously

async function readLogFile() {
  return new Promise((resolve, reject) => {
    fs.readFile(`tmp/application111.log`, 'utf8', function (err, data) {
      if (err) {
        reject(err);
      }
      resolve(data);
    });
  });
}

readLogFile().then((data) => {
  console.log(`log data %o`, data);
}).catch((err) => { console.log(`error caught %o`, err)})

console.log('This line called before reading it means readFile not block this line');