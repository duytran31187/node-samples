const axios = require('axios');
const cheerio = require('cheerio');
const fs = require('fs');
const csvWriter = require('fast-csv').write;

let url = 'https://bibomart.com.vn/sua-bot-cac-loai.html?p=';
const numPage = 1;
const data = [];
for (let pa = 1; pa <=numPage; pa++) {
  const link = url + pa;
  axios(link).then(response => {
    const html = response.data;
    const $ = cheerio.load(html);

    // replace '.item' with the actual selector for the items you want to scrape
    $('.product-item').each(function(i, elem) {
      data[i] = {
        name: $(this).find('.product-item-link').text()	, // replace '.name' with the actual selector for the name
        price: $(this).find('.price').text().replace('₫', '').replaceAll(',', '').trim() // replace '.price' with the actual selector for the price
      };
    });

    console.log(data);

    // const ws = fs.createWriteStream('output.csv');

    // csvWriter(data, { headers: true })
    //     .pipe(ws)
    //     .on('finish', function() {
    //         console.log('Done writing to CSV file.');
    //     });
  })
  .catch(console.error);

}




