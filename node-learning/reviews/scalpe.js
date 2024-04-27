const axios = require('axios');
const cheerio = require('cheerio');
const fs = require('fs');
const csvWriter = require('fast-csv').write;

const url = 'https://vinaquick.com/collections/beaba';

axios(url)
  .then(response => {
    const html = response.data;
    const $ = cheerio.load(html);
    const data = [];

    // replace '.item' with the actual selector for the items you want to scrape
    $('.item-container').each(function(i, elem) {
      data[i] = {
        name: $(this).find('.item-title > a').attr('title'), // replace '.name' with the actual selector for the name
        picture: $(this).find('.item-image img.img-loop').attr('src'), // replace '.name' with the actual selector for the name
        price: $(this).find('.item-price > span').text().replace('₫', '').replaceAll(',', '') // replace '.price' with the actual selector for the price
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