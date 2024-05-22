
const fs = require('fs');
const { stringify } = require("csv-stringify");
const { stdout } = require('process');

const {tinh4TuanMuaVong} = require('./tinh4TuanMuaVong');
const tinhNgayPhucSinh = require('./tinhlephucsinh');



const filename = 'namphungvu.csv';

const ws = fs.createWriteStream(filename);
ws
  .on('error', (err) => {
    console.error(`[ws] ERROR %s`, err);
  })
  .on('close', () => {
    console.error(`[ws] FINISH`);
  });

const stringifier = stringify({ header: true, columns: ['year','year A|B|C','First Sunday of Advent', 'Second Sunday of Advent', 'Third Sunday of Advent', 'Fourth Sunday of Advent', 'Easter Sunday'], quote: true });


stringifier
// .pipe(process.stdout)  // => print out to console
.pipe(ws)
.on('finish', function() {
    console.log('Done writing to CSV file.');
});

// console.log("Year |first sunday     | second sunday   | third sunday    | fourth sunday   | easter");
for (var y = 2000; y <= 2040; y++) {
    [sunday1, sunday2, sunday3, sunday4, year] = tinh4TuanMuaVong(y);
    const easter = tinhNgayPhucSinh(y);
    stringifier.write([
        y,
        year,
        sunday1.toDateString(),
        sunday2.toDateString(),
        sunday3.toDateString(),
        sunday4.toDateString(),
        easter.toDateString()
    ]);
    // console.log(`${year}    | ${sunday1.toDateString()} | ${sunday2.toDateString()} | ${sunday3.toDateString()} | ${sunday4.toDateString()} | ${lePhucSinh.toDateString()}`)
    // console.log(`${year}    | ${sunday1.toLocaleString('vi-VN', { timeZone: 'UTC' })} | ${sunday2.toDateString()} | ${sunday3.toDateString()} | ${sunday4.toDateString()} | ${lePhucSinh.toDateString()}`)
}
stringifier.end();