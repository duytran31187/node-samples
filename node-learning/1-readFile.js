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

getTextFromFile('./files/first.txt')
  .then(data => console.log(`First content ${data}`))
  .catch(e => console.log(e));
