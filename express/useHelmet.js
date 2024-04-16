const express = require('express');
const app = express();
const helmet = require('helmet');
//
// 1.static
// 2. json
// 3. urlencoded
app.use(express.json());                             // This is a built-in middleware function in Express. It parses incoming requests with JSON payloads and is based on body-parser.
app.use(express.urlencoded({ extended: false })); // This is a built-in middleware function in Express. It parses incoming requests with urlencoded payloads (on postman, we can see the payload type) and is based on body-parser.
app.use(helmet()); // Helmet helps you secure your Express apps by setting various HTTP headers. It's not a silver bullet, but it can help!, ref: https://expressjs.com/en/advanced/best-practice-security.html
app.post('/api/user', (req, res) => {
    console.log(req.body);
    res.send(req.body);
});
app.listen(3000, () => {
    console.log('Server is listening on port 3000');
});
