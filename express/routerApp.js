
const express = require('express');
const helmet = require('helmet');
const app = express();
app.use(helmet());
app.use(express.static('public'));
app.use(express.json());
app.use(express.urlencoded({extended: false}));

// router
const router = require('./theRouter'); // import the router
app.use('/route-to-any', router); // first argument is the ANY path, second is the router => the link will be sample: http://localhost:3000/route-to-any/about.....

app.listen(3000, () => {
    console.log(`routerApp is running on port 3000`);
});