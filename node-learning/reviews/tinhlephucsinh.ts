const {convertSolar2Lunar} = require('./lephucsinhlib');

// chuyen doi ngay duong sang ngay âm
const cloneDate = (d: Date) => {
	return new Date(d.getTime());
}

type simpleDate  = {
    year: number,
    month: number,
    day: number
};
const tinhngayramsau21thang3 = (y: number): simpleDate => {
    // tim ngay rằm
    let ngayRamFound = false;
    let count = 0;
    
    let dateFrom21: number = 21;
    let month: number = 3;
    let results: number[] = [];
    do {
        const ngayAm = convertSolar2Lunar(
            dateFrom21,
            month,
            y,
            7 // UTC+7
        );
        const lunarDay = ngayAm[0];
        if (lunarDay === 16) { // month can be different
            ngayRamFound = true;
            // console.log(`${y} NGAY RAM: ${dateFrom21}/${month}`);
            results = [dateFrom21, month, y];
        }
        count++;
        dateFrom21++;
        if (dateFrom21 == 32) { // qua thang 4
            dateFrom21 = 1;
            month = 4;
        }

    } while (!ngayRamFound)
    return {
        year: y,
        month: month,
        day: dateFrom21
    };
};

const tinhThuTuLeTro = (ngayLePhucSinh) => {
	const thutuLeTro = cloneDate(ngayLePhucSinh);
	thutuLeTro.setDate(thutuLeTro.getDate() - 46);
	return thutuLeTro;
}


const addDate = (currentDate: Date, numOfDate: number) => {
    const newDate = cloneDate(currentDate);
    newDate.setDate(newDate.getDate() + numOfDate);
    return newDate;
};

const timChuaNhatGanNhatTuNgay = (d:Date): Date => {
	// chua nhat gan nhat sau ngay d, có thể là ngày d
	let sundayFound = false;
	let closestSunday = cloneDate(d);
    do {
        if (closestSunday.getDay() === 0) { //sunday
            sundayFound = true;
            break;
        }
		closestSunday.setDate(closestSunday.getDate() + 1);
    } while (!sundayFound)
    return closestSunday;    
}
const tinhNgayPhucSinh = (year : number) => {// tim ngay chua nhat gan nhat SAU ngay ram
	const simpleDateParam: simpleDate = tinhngayramsau21thang3(year);
	let closestSunday = new Date(simpleDateParam.year + '-'+ simpleDateParam.month + '-' + simpleDateParam.day);
	closestSunday.setDate(closestSunday.getDate() + 1);
	return timChuaNhatGanNhatTuNgay(closestSunday);
}
const tinhLeChuaHienLinh = (y: number) => {
	const christmasDate = new Date(y+'-12-25');
	const chuaNhatSauGiangsinh = timChuaNhatGanNhatTuNgay(christmasDate);
	chuaNhatSauGiangsinh.setDate(chuaNhatSauGiangsinh.getDate())
	return addDate(chuaNhatSauGiangsinh, 7);
}


// for (let ye = 2022; ye <= 2034; ye++) {
// 	const ngayPhucSinh = tinhNgayPhucSinh(ye);
// 	// console.log(ngayPhucSinh);
// 	const leTro = tinhThuTuLeTro(ngayPhucSinh);
// 	// console.log(`${ye} PHUC SINH: ${ngayPhucSinh.toDateString()} le Tro ${leTro.toDateString()}`);
// 	console.log(`${ye} PHUC SINH: ${ngayPhucSinh.toDateString()}`);
// }
module.exports = {tinhNgayPhucSinh, tinhThuTuLeTro, addDate, tinhLeChuaHienLinh};