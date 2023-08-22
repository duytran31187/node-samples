const express = require("express");
const path = require("path");
const app = express();

app.get("/api", (req, res) => {
  console.log(`user hit the server`);
  res.sendFile(path.resolve(__dirname, "./navbar-app/index.html"));
});
app.listen(5000);