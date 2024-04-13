const express =require('express');
const app = express();

// app object has methods for HTTP verbs (get, post, put, delete, etc.)
// take 2 args: 1. route 2. callback to run if HTTP request matches the route
app.get('/', (req, res) => {
    req.send(`<h1>[GET] Home page</h1>`);
});
app.post('/', (req, res) => {
    req.send(`<h1>[POST] Home page</h1>`);
});
app.put('/', (req, res) => {
});
app.delete('/', (req, res) => {
});
app.listen(3000);