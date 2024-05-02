const axios = require('axios');
const cheerio = require('cheerio');
const fs = require('fs');
const { stringify } = require("csv-stringify");
const { stdout } = require('process');

let url = 'https://bibomart.com.vn/be-uong-sua.html?p=';
const numPage = 29;
const productsContainer = '.product-item';
const productNameContainer = '.product-item-link';
const productPriceContainer = '.price';
const filename = 'suabeuong.csv';

const ws = fs.createWriteStream(filename);

const stringifier = stringify({ header: true, columns: ['name', 'price'], quote: true });


stringifier
//.pipe(process.stdout)
.pipe(ws)
.on('finish', function() {
      console.log('Done writing to CSV file.');
});

for (let pa = 1; pa <= numPage; pa++) {
  const link = url + pa;
  axios(link).then(response => {
    const html = response.data;
    const $ = cheerio.load(html);
    
    // read data from html
    $(productsContainer).each(function (i, elem) {
      const dataItem = {
        name: $(this).find(productNameContainer).text().replace('\n', '').trim(),
        price: $(this).find(productPriceContainer).first().text().replace('₫', '').replaceAll('.', '').trim()
      };
      // console.log(`data %o`, dataItem);
      stringifier.write(dataItem);        
    });
    /////////////

  }).catch(console.error);
} 

