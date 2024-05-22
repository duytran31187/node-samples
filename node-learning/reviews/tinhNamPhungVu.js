
const fs = require('fs');
const { stringify } = require("csv-stringify");
const { stdout } = require('process');

const {tinh4TuanMuaVong} = require('./tinh4TuanMuaVong');
const {tinhNgayPhucSinh, tinhThuTuLeTro, addDate, tinhLeChuaHienLinh} = require('./tinhlephucsinh');



const filename = 'namphungvu.csv';

const ws = fs.createWriteStream(filename);
ws
  .on('error', (err) => {
    console.error(`[ws] ERROR %s`, err);
  })
  .on('close', () => {
    console.error(`[ws] FINISH`);
  });

const stringifier = stringify({ header: true, columns: [
    'year',
    'A|B|C',
    'Odd|Even',
    'Ash Wednesday',
    'First Sunday of Lent',
    'Second Sunday of Lent',
    'Third Sunday of Lent',
    'Fourth Sunday of Lent',
    'Fifth Sunday of Lent',
    'Palm Sunday (Lễ Lá)',
    'Easter Sunday',
    'Second Sunday of Easter',
    'Third Sunday of Easter',
    'Fourth Sunday of Easter',
    'Fifth Sunday of Easter',
    'Sixth Sunday of Easter',
    'The Ascention of the Lord',
    'Pentecost Sunday',
    'First Sunday of Advent',
    'Second Sunday of Advent',
    'Third Sunday of Advent',
    'Fourth Sunday of Advent',
    'christmas',
    'The Epiphany of the Lord (Hiển Linh)'
], quote: true });


stringifier
//.pipe(process.stdout)  // => print out to console
.pipe(ws)
.on('finish', function() {
    console.log('Done writing to CSV file.');
});
// console.log("Year |first sunday     | second sunday   | third sunday    | fourth sunday   | easter");
for (var y = 2000; y <= 2050; y++) {
    [sunday1, sunday2, sunday3, sunday4, year] = tinh4TuanMuaVong(y);
    const easter = tinhNgayPhucSinh(y);
    const ashWednesday = tinhThuTuLeTro(easter);
    stringifier.write([
        y,
        year,
        y%2 ==0 ? 'Even' : 'Odd',
        ashWednesday.toDateString(),
        addDate(ashWednesday, 4).toDateString(), //First Sunday of Lent
        addDate(ashWednesday, 11).toDateString(), // second
        addDate(ashWednesday, 18).toDateString(), // third
        addDate(ashWednesday, 25).toDateString(), // fourth
        addDate(ashWednesday, 33).toDateString(), // fifth
        addDate(ashWednesday, 40).toDateString(), // Palm Sunday (Lễ Lá)
        easter.toDateString(),
        addDate(easter, 7).toDateString(), //second
        addDate(easter, 14).toDateString(), // 3
        addDate(easter, 21).toDateString(),// 4
        addDate(easter, 28).toDateString(),// 5
        addDate(easter, 35).toDateString(), // 6
        addDate(easter, 42).toDateString(), // The Ascention of the Lord
        addDate(easter, 49).toDateString(), // Pentecost Sunday
        sunday1.toDateString(), // First Sunday of Advent
        sunday2.toDateString(),
        sunday3.toDateString(),
        sunday4.toDateString(), // Fourth Sunday of Advent
        new Date(y+'-12-25').toDateString(),  // christmas
        tinhLeChuaHienLinh().toDateString() // chua hien linh
    ]);
}
stringifier.end();