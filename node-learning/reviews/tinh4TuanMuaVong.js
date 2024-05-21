var mapDates = (Array);
// console.log(`Year |first sunday     | second sunday   | third sunday    | fourth sunday   | christmas`);
var tinh4TuanMuaVong = function (y) {
    /////////////////////////////////////A|B|C///
    var yearStr = y.toString();
    var yearNums = Array.from(yearStr);
    var countNum = 0;
    yearNums.forEach(function (element) {
        countNum += parseInt(element);
    });
    var year;
    switch (countNum % 3) {
        case 1:
            year = 'A';
            break;
        case 2:
            year = 'B';
            break;
        default:
            year = 'C';
    }
    ///////////
    var chrismastDate = new Date(y + '-12-25');
    // console.log(`vong giang sinh: %s`, chrismastDate.toDateString());
    // tuan thu 4 mua vong
    var closestSunday = chrismastDate;
    var sundayFound = false;
    var count = 0;
    do {
        var closestSunday_1 = chrismastDate;
        closestSunday_1.setDate(chrismastDate.getDate() - 1);
        if (closestSunday_1.getDay() === 0) { //sunday
            var sunday4 = new Date(closestSunday_1.getTime());
            var sunday3 = new Date(sunday4.getTime());
            sunday3.setDate(sunday3.getDate() - (7));
            var sunday2 = new Date(sunday3.getTime());
            sunday2.setDate(sunday2.getDate() - (7));
            var sunday1 = new Date(sunday2.getTime());
            sunday1.setDate(sunday2.getDate() - (7));
            sundayFound = true;
            return [
                sunday1,
                sunday2,
                sunday3,
                sunday4,
                year
            ];
            // console.log(`${year}    | ${sunday1.toDateString()} | ${sunday2.toDateString()} | ${sunday3.toDateString()} | ${sunday4.toDateString()} | ${chrismastDate.toDateString()}`)
        }
        count++;
    } while (!sundayFound || count > 10);
};
// for (var ye = 2000; ye <= 2024; ye++) {
//     // 29/11/2020
//     // 28 tháng 11 năm 2021 => tuan 1
//     // 27 tháng 11 năm 2022 => tuan 1
//     // Sun Dec 03 2023 => tuan 1
//     //Sun Dec 01 2024 => tuan 1
//     tinh4TuanMuaVong(ye);
// }
module.exports = { tinh4TuanMuaVong: tinh4TuanMuaVong };
