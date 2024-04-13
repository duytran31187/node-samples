const express = require('express');
const app = express();  
// app comes with a use method that allows you to use middleware
app.use(express.static('public'));

app.listen(3000);