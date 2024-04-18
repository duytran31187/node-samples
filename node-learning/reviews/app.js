const http = require('http');

const server = http.createServer((req, res) => {
    console.log(`server is running on port ${process.env.PORT || 5000}`);
    res.write('Hello World aaaaaaaaaaaa');
    res.end();
});
server.listen(process.env.PORT || 5000);