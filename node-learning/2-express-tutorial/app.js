const express = require("express");
const path = require("path");
const app = express();

app.use(express.static(path.resolve(__dirname, "./navbar-app"))); // https://expressjs.com/en/starter/static-files.html
// note: the path that you provide to the express.static function is relative to the directory from where you launch your node process
app.get("/", (req, res) => {
    console.log(`user hit the server`);
    res.sendFile(path.resolve(__dirname, "./navbar-app/index.html"));
});
app.get("/about", (req, res) => {
    console.log(`user hit the server`);
    res.send("GET request to About");
});
app.get("/projects", (req, res) => {
    console.log(`user hit the server`);
    res.send("GET request to projects");
});
app.get("/contact", (req, res) => {
    console.log(`user hit the server`);
    res.send("GET request to contact");
});
app.all("*", (req, res) => {
    res.status(404).send("404 not found");
});
app.listen(5000);