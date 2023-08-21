// to run:
// copy the content to app.js file
// then run command: npm start
const express = require("express");
const app = express();

app.get("/", (req, res) => {
    console.log(`user hit the server`);
    res.send("GET request to homepage");
});
app.get("/about", (req, res) => {
    console.log(`user hit the server`);
    res.send("GET request to About");
});
app.all("*", (req, res) => {
    res.status(404).send("404 not found");
});
app.listen(5000);