const express = require('express');
const app = express();
// express is 2 things
// 1. a router
// 2. Middleware that comprises a web framework

//REQ--MIDDLEWARE--RES
// mIDDLEWARE FUNCTION IS ANY FUNCTION THAT HAS ACCESS TO THE REQ, RES, NEXT OBJECT


/// Req --> Middleware --> Res

// 1. Request comes in
// 2. We need to validate the user, sometimes
// 3. We need to store some things in the database
// 4. If there is data from the user, we need to parse it and store it
// 5. Response
function validateUser(req, res, next) {
    // get info out of the request object
    // do some stuff with the database
    res.locals.validated = true;
    console.log('validated ran');
    next(); // pass control to the next middleware function, unless it's the last middleware function
}
function logRequest(req, res, next) {
    console.log(`Request made to: ${req.url}`);
    next();
}

function logGetRequest(req, res, next) {
    console.log(`GET Request made to: ${req.url}`);
    next();
}

app.use(logRequest); // this middleware will run for all paths, all methods
app.get('/', logGetRequest); // this middleware will run for the '/' path, only for GET requests
app.use('/admin', validateUser); // use for specific routes, all methods


app.get('/', (req, res) => {
    res.send(`<h1>Main page</h1>`);
    console.log(res.locals.validated);
});
app.get('/admin', (req, res) => {
    res.send(`<h1>Admin page</h1>`);
    console.log(res.locals.validated);
});
app.listen(3000, () => {
    console.log('Server is listening on port 3000');
});
