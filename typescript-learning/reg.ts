let pattern = /import\/([a-zA-Z0-9]+)\/([a-zA-Z0-9_]+).csv/;

const csvFile = '+++import/24e1d6beb90995d94869cadb88cbf3bf0de4cbe8/extras_import.csv';
const key = decodeURIComponent(csvFile.replace(/\+/g, ' '));
console.log(key);
console.log(pattern.test(csvFile));
console.log(csvFile.match(pattern));