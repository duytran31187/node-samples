const axios = require('axios');
const cheerio = require('cheerio');
const fs = require('fs');
const { stringify } = require("csv-stringify");
const { stdout, exit } = require('process');
const path = require('path');

const year = 2025;
let link = `https://gcatholic.org/calendar/${year}/VN-D-vi.htm`;
const filename = `namphungvu-${year}.csv`;

const ws = fs.createWriteStream(filename);
ws
  .on('error', (err) => {
    console.error(`[ws] ERROR %s`, err);
  })
  .on('close', () => {
    console.error(`[ws] FINISH`);
  });

const stringifier = stringify({ header: true, columns: ['date', 'name', 'type', 'full'], quote: true });


stringifier
  //.pipe(process.stdout)  // => print out to console
  .pipe(ws)
  .on('finish', function () {
    console.log('Done writing to CSV file.');
  });
const mapTypeOfDate = (t) => {
  const type = t.trim();
  if (type == 'T') {
    return 'Lê Trọng';
  } else if (type == 'K') {
    return 'Lễ Kính';
  } else if (type == 'N') {
    return 'Lễ Nhớ'
  } else if (type == 'n') {
    return 'Lễ Nhớ tùy ý'
  }
  return type;
}

const writeData = (stringifier, date, typeOfDate, nameOfDate) => {
  // console.log(date.toDateString());
  let m = date.getMonth();
  m++;
  const fd = date.getDate() + '-' + m;
  const dataItem = {
    // id:  date.getDate() +'-'+ m,
    date: fd,
    type: mapTypeOfDate(typeOfDate),
    name: nameOfDate,
    full: nameOfDate + fd
  };
  stringifier.write(dataItem);
}
const readCalendar = async (link, y) => {
  return new Promise((resolveHandler, rejectHandler) => {
    axios(link)
      .then(response => {
        const html = response.data;
        const $ = cheerio.load(html);
        const rows = $('table.tb').find('tr');

        // const filteredrows = [
        //     rows[0],
        //     rows[1],
        //     rows[2],
        //     rows[3],
        //     rows[4],
        //     rows[5],
        //     // rows[39],
        //     // rows[7],
        //     // rows[8],
        //     // rows[9],
        //     // rows[10],
        //     // rows[11],
        //     // rows[12],
        //     // rows[13],
        //     // rows[14],
        //     // rows[15],
        // ]

        let d = 1; // looped date;
        let currentMonth = 1;
        let nameOfDate = '';
        let typeOfDate = '';
        $(rows).each(function (i, row) {
          nameOfDate = '';
          let aHtml = $(row).find('a').last().html();
          if ($(row).attr('class') == 'tbhd') {
            currentMonth = parseInt($(row).attr('id'));
            // Thang Gieng, Thang 2...
            console.log(`MONTH ${currentMonth}: ${$(row).find('a').first().html()}`);
          } else {
            // console.log('1111111111111');
            // ngay
            const dHtml = $(row).find('.zdate').first().html();
            if (parseInt(dHtml) > 0) {
              d = parseInt(dHtml);
              const fullDate = new Date(y + '-' + currentMonth + '-' + d);
              nameOfDate = $(row).find('.feast1').first().text();
              typeOfDate = $(row).find('.feast').first().text();

              // try w another class
              if (!nameOfDate) {
                typeOfDate = $(row).find('.feastw').first().text();
                nameOfDate = $(row).find('.feast4').first().text();
              }

              if (nameOfDate) {
                writeData(stringifier, fullDate, typeOfDate, nameOfDate);
              } else {
                typeOfDate = $(row).find('.feast').first().text();
                nameOfDate = $(row).find('.feast3').first().text();
                if (!nameOfDate) {
                  typeOfDate = $(row).find('.feastw').first().text();
                  nameOfDate = $(row).find('.feast2').first().text();
                  if (!nameOfDate) {
                    if ($(row).find('td').first().attr('rowspan') == 3) {
                      // <td align="right" rowspan="3"><span class="zdate">3</span></td><td align="center" rowspan="3"><span class="zdate">Thứ Tư</span></td>
                    } else if ($(row).find('td').first().attr('rowspan') == 4) {
                      // <td align="right" rowspan="4"><span class="zdate">13</span></td><td align="center" rowspan="4"><span class="zdate">Thứ Bảy</span></td>   
                    } else if ($(row).find('td').first().attr('rowspan') == 5) {
                      // <td align="right" rowspan="5"><span class="zdate">20</span></td><td align="center" rowspan="5"><span class="zdate">Thứ Bảy</span></td>   
                    } else if ($(row).find('td').first().attr('rowspan') == 6) {
                      // <td align="right" rowspan="5"><span class="zdate">20</span></td><td align="center" rowspan="5"><span class="zdate">Thứ Bảy</span></td>   
                    } else {
                      console.log('invalid 1');
                      console.log(`${$(row).html()}`);
                      rejectHandler('fail');
                      exit();
                    }
                  } else {

                    writeData(stringifier, fullDate, typeOfDate, nameOfDate);
                  }
                } else {
                  // const customHtml = $(row).html();
                  // $(row).html = customHtml.replaceAll('span', 'a');
                  // console.log($(row).find('p.indent').first().html());
                  let fullName = '';
                  const pIndent =  $(row).find('p.indent').first();
                  if (pIndent) {
                    if (currentMonth == 1) {
                      const arrTags = $(pIndent).find('*');
                      $(arrTags).each((ii, eT) => {
                        fullName += $(eT).html(); 
                      });
                    }
                    nameOfDate+=fullName;
                  }
                  writeData(stringifier, fullDate, typeOfDate, nameOfDate);
                }
              }
            } else {
              // console.log('333');
              typeOfDate = $(row).find('span.feastw').first().text();
              nameOfDate = $(row).find('span.feast4').first().text();
              const fullDate = new Date(y + '-' + currentMonth + '-' + d);
              if (nameOfDate) {
                // console.log(`${d} --- ${currentMonth} -- ${nameOfDate}`);

                const exnameOfDate = $(row).find('.feast4').last().text();
                nameOfDate = nameOfDate + aHtml + exnameOfDate;
                writeData(stringifier, fullDate, typeOfDate, nameOfDate);
                //console.log(`${fullDate.toDateString()} là ngày lễ: ${nameOfDate} --- ${typeOfDate}`);
                // const dataItem = {
                //     date: fullDate.toDateString(),
                //     type: mapTypeOfDate(typeOfDate),
                //     name:nameOfDate
                // };
                // stringifier.write(dataItem);
                // } else {
                //   typeOfDate = $(row).find('span.feastw').first().text();
                //   nameOfDate = $(row).find('span.feast3').first().text();
              } else {

                if (!nameOfDate) {
                  typeOfDate = $(row).find('.feastw').first().text();
                  nameOfDate = $(row).find('.feast2').first().text();
                  if (!nameOfDate) {
                    if ($(row).find('.season').length == 0) {
                      // <td rowspan="11" style="width: 40px"><div class="season">Mùa Giáng Sinh</div></td>
                      if ($(row).find('.feast5').length == 0) {
                        // <td align="center"></td><td><p class="indent"><span class="feastw"></span> <span class="feast5">Tết Nguyên Đán</span></p></td>
                        typeOfDate = $(row).find('.feast').first().text();
                        nameOfDate = $(row).find('.feast3').first().text();
                        if (nameOfDate) {
                          writeData(stringifier, fullDate, typeOfDate, nameOfDate);
                        } else {
                          typeOfDate = $(row).find('.feast').first().text();
                          nameOfDate = $(row).find('.feast1').first().text();
                          if (nameOfDate) {
                            writeData(stringifier, fullDate, typeOfDate, nameOfDate);
                          } else {
                            // <td rowspan="2" style="width: 40px"></td>
                            if ($(row).find('td').first().html().trim() == '') {

                            } else {
                              
                              typeOfDate = $(row).find('.feastw').first().text();
                              nameOfDate = $(row).find('.feast4').first().text();
                              if(nameOfDate) {
                                writeData(stringifier, fullDate, typeOfDate, nameOfDate);
                              } else {
                                
                                console.log('invalid 2');
                                console.log(`${$(row).html()}`);
                                rejectHandler('fail');
                                exit();
                              }
                            }
                          }
                        }

                        // exit();
                      }
                    }
                  } else {

                    writeData(stringifier, fullDate, typeOfDate, nameOfDate);
                  }
                } else {
                  writeData(stringifier, fullDate, typeOfDate, nameOfDate);
                }
                // exit();
              }
              // if (nameOfDate == '' || nameOfDate == null) {
              //   console.log(`FAILED ${i} ${$(row).html()}`);
              //   exit();
              //   rejectHandler('err');
              // }

              // writeData(stringifier, fullDate, typeOfDate, nameOfDate);

            }
          }
          // sleep(2000);
        });
        resolveHandler('success');
      })
      .catch((e) => {
        rejectHandler(e);
      });
  })
}
readCalendar(link, year);
// stringifier.end();
// ws.end(); 