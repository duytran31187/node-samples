const {readFile} = require('fs');

const getTextFromFile = (path) => {
  return new Promise((resolve, reject) => {
    readFile(path, 'utf8', (err, data) => {
      if(err) {
        reject(err);
      }
      resolve(data)
    })
  })
}
const start = async () => {
  try {
    const first = await getTextFromFile('./files/first.txt');
    const second = await getTextFromFile('./files/second.txt');
    console.log(first, second);
  } catch (error) {
    console.log(error);
  }
}
start();
