const path = require('path');
//nodejs is the language and express node, node module.
const express = require('express');
const app = express(); // app is the express function (createApplication inside express module)
//invoked and is an express application.

app.use(express.static('public')); // middleware function that serves static files from public folder


app.all('/', (req, res) => {
    // express handles the basic headers(status-code, mime-type, etc.)
    // express handles the end (res.end) for you
    // res.send(`<h1>Home page</h1>`);
    res.sendFile(path.join(__dirname, 'node.html'));
});
app.all('*', (req, res) => {
    res.send('<h1>404 Page Not Found</h1>');
});

app.listen(5000, () => {
    console.log('Server is listening on port 5000');
});