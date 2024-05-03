const axios = require('axios');
const cheerio = require('cheerio');
const fs = require('fs');
const { stringify } = require("csv-stringify");
const { stdout } = require('process');

let url = 'https://bibomart.com.vn/be-uong-sua.html?p=';
const numPage = 10;
const productsContainer = '.product-item';
const productNameContainer = '.product-item-link';
const productPriceContainer = '.price';
const filename = 'suabeuong.csv';

const ws = fs.createWriteStream(filename);
ws
  .on('error', (err) => {
    console.error(`[ws] ERROR %s`, err);
  })
  .on('close', () => {
    console.error(`[ws] FINISH`);
  });

const stringifier = stringify({ header: true, columns: ['name', 'price', 'page'], quote: true });


stringifier
// .pipe(process.stdout)  // => print out to console
.pipe(ws) // => to write to file
.on('finish', function() {
    console.log('Done writing to CSV file.');
});

const readProductsFromLink = (link) => {
  return new Promise((resolveHandler, rejectHandler) => {
    axios(link)
      .then(response => {
        const html = response.data;
        const $ = cheerio.load(html);
        
        // read data from html
        $(productsContainer).each(function (i, elem) {
          const dataItem = {
            name: $(this).find(productNameContainer).text().replace('\n', '').trim(),
            price: $(this).find(productPriceContainer).first().text().trim(),
            page: link
          };
          // console.log(`%o`, dataItem);
          stringifier.write(dataItem);
        });
        resolveHandler('success');
      })
      .catch((e) => {
        rejectHandler(e);
      });
  })
}
async function main() { // note: there's await function call inside so need async keyword here
  try {
    for(let pa = 1; pa <= numPage; pa++) {
      const link = url + pa;
      console.log(`%s`, link);
      await readProductsFromLink(link) // await make sure the function is done before moving to the next iteration (he keyword await makes JavaScript wait until that promise settles and returns its result.)
        // .then((result) => {
        //   console.log(`done link: `, link);
        // })
        // .catch(e => {
        //   console.log(`main catched err: %o`, e);
        // })
    }
    stringifier.end();
    ws.end();  
  } catch(err) {
    console.log(err);
  }
}
main();
