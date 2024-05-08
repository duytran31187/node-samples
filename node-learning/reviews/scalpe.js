const axios = require('axios');
const cheerio = require('cheerio');
const fs = require('fs');
const { stringify } = require("csv-stringify");
const { stdout } = require('process');
const path = require('path');


let url = 'https://concung.com/sua-bot-101586.html';
const numPage = 1;
const productsContainer = '.product-item';
const productNameContainer = '.product-item a.product-name';
const productPriceContainer = '.product-item .product-price';
const productImageContainer = '.product-item .img-fluid';
const filename = 'concung-suabot.csv';

const ws = fs.createWriteStream(filename);

const stringifier = stringify({ header: true, columns: ['id','name', 'price', 'image', 'page'], quote: true });


stringifier
// .pipe(process.stdout)  // => print out to console
.pipe(ws)
.on('finish', function() {
    console.log('Done writing to CSV file.');
});

const download_image = (url, image_path) =>
  axios({
    url,
    responseType: 'stream',
  }).then(
    response =>
      new Promise((resolve, reject) => {
        response.data
          .pipe(fs.createWriteStream(image_path))
          .on('finish', () => resolve(`downloaded image ${image_path}`))
          .on('error', e => {
            console.log(`download e`, e);
            reject(e);
          });
      }),
  );

const readProductsFromLink = (link) => {
  return new Promise((resolveHandler, rejectHandler) => {
    axios(link)
      .then(response => {
        const html = response.data;
        const $ = cheerio.load(html);
        let productId = 1;
        
        // read data from html
        $(productsContainer).each(async function (i, elem) {
          const dataItem = {
            id: productId,
            name: $(this).find(productNameContainer).first().text().replace('\n', '').replaceAll('"', '').trim(),
            price: $(this).find(productPriceContainer).first().text().replace('₫', '').replaceAll('.', '').trim(),
            image: $(this).find(productImageContainer).first().attr('data-original'),
            page: link
          };
          productId++;
          console.log(`%s`, dataItem.name);
          const imageUrl = dataItem.image;
          console.log(`start downloading image ${productId}`);
          const downloededImage = await download_image(imageUrl, path.join(__dirname, 'images/concung', productId + '.png'));
          console.log(`downloaded: ${downloededImage}`);
          console.log(`current id ${productId}`);
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
      let link = url;
      if (numPage > 1) {
        link = url + pa;
      }
      console.log(`%s`, link);
      await readProductsFromLink(link) // without await, the result can be returned not in any order of pages called
        // .then((result) => {
        //   console.log(`done link: `, link);
        // })
        // .catch(e => {
        //   console.log(`main catched err: %o`, e);
        // })
    }
  } catch(err) {
    console.log(err);
  }
}
main();
