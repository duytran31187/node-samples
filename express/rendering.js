const express = require('express');
const path = require('path');
const helmet = require('helmet');
const app = express();
app.use(express.static('public'));
app.use(express.json());
app.use(express.urlencoded());
app.use(helmet({
    contentSecurityPolicy: false, // to sort the script cant be loaded
}));// for security  

//1.  express as we know it happens. this file.
// 2. we define a view engine
// - ejs
// - mustache
// - jade/pug
// - handlebars
// 3. inside one of our routes, we have a res.render
// 4. res.render takes 2 things:
// - the name of the view
// - data we want to pass to the view
// 5. Express use node module for our specific view engine and parse the view. 
// 6. Express sends the parsed view back to the client

app.set('view engine', 'ejs'); // set the view engine to ejs, which is a templating engine and must be installed in the project
app.set('views', path.join(__dirname, 'views')); // set the views directory to the views folder


app.get('/', (req, res, next) => {
    res.render('index', {
        name: 'John Doe',
    });
    res.send('sanity check !!!');
});

app.listen(3001, () => {
    console.log(`listening port 3001`);
});