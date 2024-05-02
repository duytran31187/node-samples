const axios = require('axios');
const cheerio = require('cheerio');
const fs = require('fs');
const csvWriter = require('fast-csv').write;

let url = 'https://bibomart.com.vn/sua-bot-cac-loai.html?p=';
const numPage = 2;
let data = [];
for (let pa = 1; pa <=numPage; pa++) {
  const link = url + pa;
  axios(link).then(response => {
    const html = response.data;
    const $ = cheerio.load(html);

    // replace '.item' with the actual selector for the items you want to scrape
    $('.product-item').each(function(i, elem) {
      const dataItem =  {
        name: $(this).find('.product-item-link').text().replace('\n', '').trim(), // replace '.name' with the actual selector for the name
        price: $(this).find('.price').first().text().replace('₫', '').replaceAll(',', '').trim() // replace '.price' with the actual selector for the price
      };
	    data.push(dataItem);	    
    });

  })
  .catch(console.error);
}
setTimeout(() => {
console.log(data);
const ws = fs.createWriteStream('output.csv', {encoding: 'utf8'});

    csvWriter(data, { headers: true })
        .pipe(ws)
        .on('finish', function() {
             console.log('Done writing to CSV file.');
        });
}, 1000);






