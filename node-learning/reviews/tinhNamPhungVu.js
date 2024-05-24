var fs = require('fs');
var stringify = require("csv-stringify").stringify;
var stdout = require('process').stdout;
var tinh4TuanMuaVong = require('./tinh4TuanMuaVong').tinh4TuanMuaVong;
var _a = require('./tinhlephucsinh'), tinhNgayPhucSinh = _a.tinhNgayPhucSinh, tinhThuTuLeTro = _a.tinhThuTuLeTro, addDate = _a.addDate, tinhLeChuaHienLinh = _a.tinhLeChuaHienLinh;
var filename = 'namphungvu.csv';
var ws = fs.createWriteStream(filename);
ws
    .on('error', function (err) {
    console.error("[ws] ERROR %s", err);
})
    .on('close', function () {
    console.error("[ws] FINISH");
});
var stringifier = stringify({ header: true, columns: [
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
    .on('finish', function () {
    console.log('Done writing to CSV file.');
});
// console.log("Year |first sunday     | second sunday   | third sunday    | fourth sunday   | easter");
for (var y = 2000; y <= 2050; y++) {
    var tuanmuaVong = tinh4TuanMuaVong(y);
    var sunday1 = tuanmuaVong.week1;
    var sunday2 = tuanmuaVong.week2;
    var sunday3 = tuanmuaVong.week3;
    var sunday4 = tuanmuaVong.week4;
    var year = tuanmuaVong.yearABC;
    var easter = tinhNgayPhucSinh(y);
    var ashWednesday = tinhThuTuLeTro(easter);
    var namphungVuIns = {
        year: y,
        yearABC: year,
        oddEven: y % 2 == 0 ? 'Even' : 'Odd',
        ashWed: ashWednesday,
        firstSundayOfLent: addDate(ashWednesday, 4),
        secondSundayOfLent: addDate(ashWednesday, 11),
        thirdSundayOfLent: addDate(ashWednesday, 18),
        fourthSundayOfLent: addDate(ashWednesday, 25),
        fifthSundayOfLent: addDate(ashWednesday, 32),
        palmSunday: addDate(ashWednesday, 40),
        easterSunday: easter,
        secondSundayOfEaster: addDate(easter, 7),
        thirdSundayOfEaster: addDate(easter, 14),
        fourthSundayOfEaster: addDate(easter, 21),
        fifthSundayOfEaster: addDate(easter, 28),
        sixthSundayOfEaster: addDate(easter, 35),
        theAscentionOfTheLord: addDate(easter, 42),
        pentecostSunday: addDate(easter, 49),
        firstSundayOfAdvent: tuanmuaVong.week1,
        secondSundayOfAdvent: tuanmuaVong.week2,
        thirdSundayOfAdvent: tuanmuaVong.week3,
        fourthSundayOfAdvent: tuanmuaVong.week4,
        christmas: new Date(y + '-12-25'),
        theEpiphanyOfTheLord: tinhLeChuaHienLinh(),
    };
    stringifier.write([
        namphungVuIns.year,
        namphungVuIns.yearABC,
        namphungVuIns.oddEven,
        namphungVuIns.ashWed,
        namphungVuIns.firstSundayOfLent.toDateString(), //First Sunday of Lent
        namphungVuIns.secondSundayOfLent.toDateString(), // second
        namphungVuIns.thirdSundayOfLent.toDateString(), // third
        namphungVuIns.fourthSundayOfLent.toDateString(), // fourth
        namphungVuIns.fifthSundayOfLent.toDateString(), // fifth
        namphungVuIns.palmSunday.toDateString(), // Palm Sunday (Lễ Lá)
        easter.toDateString(),
        namphungVuIns.secondSundayOfEaster.toDateString(), //second
        namphungVuIns.thirdSundayOfEaster.toDateString(), // 3
        namphungVuIns.fourthSundayOfEaster.toDateString(), // 4
        namphungVuIns.fifthSundayOfEaster.toDateString(), // 5
        namphungVuIns.sixthSundayOfEaster.toDateString(), // 6
        namphungVuIns.theAscentionOfTheLord.toDateString(), // The Ascention of the Lord
        namphungVuIns.pentecostSunday.toDateString(), // Pentecost Sunday
        namphungVuIns.firstSundayOfAdvent.toDateString(), // First Sunday of Advent
        namphungVuIns.secondSundayOfAdvent.toDateString(),
        namphungVuIns.thirdSundayOfAdvent.toDateString(),
        namphungVuIns.fourthSundayOfAdvent.toDateString(), // Fourth Sunday of Advent
        namphungVuIns.christmas.toDateString(), // christmas
        namphungVuIns.theEpiphanyOfTheLord.toDateString() // chua hien linh
    ]);
}
stringifier.end();
