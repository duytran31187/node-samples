const http = require('http');

const server = http.createServer((req, res) => {
    console.log(`server is running on port 5000.................`);
    res.write('Hello World aaaaaaaaaaaa');
    res.end();
});
server.listen(5000);