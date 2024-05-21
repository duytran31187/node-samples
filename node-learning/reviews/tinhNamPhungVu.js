const {tinh4TuanMuaVong} = require('./tinh4TuanMuaVong');
const tinhNgayPhucSinh = require('./tinhlephucsinh');

console.log("Year |first sunday     | second sunday   | third sunday    | fourth sunday   | easter");
for (var y = 2022; y <= 2034; y++) {
    [sunday1, sunday2, sunday3, sunday4, year] = tinh4TuanMuaVong(y);
    const lePhucSinh = tinhNgayPhucSinh(y);
    console.log(`${year}    | ${sunday1.toDateString()} | ${sunday2.toDateString()} | ${sunday3.toDateString()} | ${sunday4.toDateString()} | ${lePhucSinh.toDateString()}`)
    // console.log(`${year}    | ${sunday1.toLocaleString('vi-VN', { timeZone: 'UTC' })} | ${sunday2.toDateString()} | ${sunday3.toDateString()} | ${sunday4.toDateString()} | ${lePhucSinh.toDateString()}`)
}