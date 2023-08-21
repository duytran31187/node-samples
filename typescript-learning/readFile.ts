import * as fs from "fs";
// command: npx tsc readFile.ts && node readFile.js
// read file synchronously
const logStream = fs.readFileSync(`tmp/application.log`, {encoding: 'utf8'});
const jsonLog = logStream.split("\n")
console.log(jsonLog);
const csvLogJson = {
  importLog: jsonLog
};
console.log('reading...');
fs.writeFile(`tmp/application.json`, JSON.stringify(csvLogJson), 'utf8', function (err) {
  if (err) {
    console.log("An error occured while writing JSON Object to File.");
    return console.log(err);
  }

  console.log("JSON file has been saved.");
});