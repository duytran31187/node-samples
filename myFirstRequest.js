var http = require('http');
var url = require('url');
var dt = require("./sampleDateModule");

http.createServer(function (req, res) {
  res.writeHead(200, {'Content-Type': 'text/html'});
  res.write("Hello world <br />");
  res.write (req.url +  '<br />'); // try url: http://localhost:8080/summer
  res.write("The date and time are currently: " + dt.myDateTime() + '<br />');
  var q = url.parse(req.url, true).query;
  var txt = q.year + " " + q.month;
  res.write(txt); // try url: http://localhost:8080/summer?year=2017&month=July
  res.end();
}).listen(8080);
// in browser: http://localhost:8080/