const http  = require("http");
const fs = require("fs");

// get all fileds
const homePage = fs.readFileSync("./navbar-app/index.html");
const styleFile = fs.readFileSync("./navbar-app/styles.css");
const logoImage = fs.readFileSync("./navbar-app/logo.svg");
const jsFile = fs.readFileSync("./navbar-app/browser-app.js");

const server = http.createServer((req, res) => {
    // https://nodejs.org/dist/latest-v20.x/docs/api/http.html#responseenddata-encoding-callback
    console.log(`user hit the server ${req.url}`);
    
    if (req.url === '/') {
        res.writeHead(200, {
            "Content-Type": "text/html"
        });
        res.write(homePage);
    } else if (req.url === '/styles.css') {
        res.writeHead(200, {
            "Content-Type": "text/css"
        });
        res.write(styleFile);
    } else if (req.url === '/logo.svg') {
        res.writeHead(200, {
            "Content-Type": "image/svg+xml"
        });
        res.write(logoImage);
    } else if (req.url === '/browser-app.js') {
        res.writeHead(200, {
            "Content-Type": "text/javascript"
        });
        res.write(jsFile);
    } else {
        res.writeHead(404, {
            "Content-Type": "text/html"
        });
        res.write("<h1>Error page</h1>");
    }
    res.end(); // The method, response.end(), MUST be called on each response.
})

server.listen(5000);