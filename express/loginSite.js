const exp = require('constants');
const express = require('express');
const app = express();
const path = require('path'); // to resolve path
const cookieParser = require('cookie-parser');

//security
const helmet = require('helmet');
app.use(helmet());

app.use(express.static('public'));
app.use(express.json());
app.use(express.urlencoded({extended: false}));

//declare view engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));


//[middleware] to cath && process message from request
// note all middleware must call next() to continue the process
app.use((req, res, next) => {
    res.locals.msg = '';
    if (req.query.msg == 'fail') {
        res.locals.msg = ' SORY, this is invalid username/password  '
    }
    next(); // remember to put next, unless the code will stop here
});

// route to process login page
app.get('/login', (req, res) => {
    console.log(req.query.msg);
    res.render(
        'login.ejs', 
        {
            //msg: req.query.msg // this case use the message from query
            msg: res.locals.msg // use msg from locals
        }
    );
});

// route to process welcome page
app.use(cookieParser()); // to parse cookie
app.get('/welcome', (req, res) => {
    res.render(('welcome.ejs'), {
        name: req.cookies.username // cookieParser will parse cookie to req.cookies unless it will be undefined
    });
});

// route to process POST data
app.post('/process_login', (req, res) => {
    const username = req.body.username;
    const password = req.body.password;
    console.log(`username ${username} password ${password}`);
    if (username == 'admin' && password == '123') {
        res.cookie('username', username); // set validated user to cookie
        res.redirect('/welcome');
    } else {
        res.redirect('/login?msg=' + "fail");
    }
})

// route to process logout
app.get('/logout', (req, res) => {
    res.clearCookie('username'); // clear cookie
    res.redirect('/login');
})
// route to post
app.get('/post/:postId', (req, res) => {
    res.send(`viewing post id ${req.params.postId}`);
})

// to catch invalid routes
app.get('*', (req, res) => {
    res.send('404 not found');    
})


// listening
app.listen(3000, () => {
    console.log(`login site`);
});