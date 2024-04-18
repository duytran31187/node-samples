const express = require('express');
const app = express();
app.use(express.json());                             // This is a built-in middleware function in Express. It parses incoming requests with JSON payloads and is based on body-parser.
app.use(express.urlencoded({ extended: false })); // This is a built-in middleware function in Express. It parses incoming requests with urlencoded payloads (on postman, we can see the payload type) and is based on body-parser.
app.post('/api/user', (req, res) => {
    console.log(req.body);
    // res.send('User created'); // return response.header.Content-Type = text/html
    res.json(['test', 1,23]); // return response.header.Content-Type = application/json
});
app.listen(3000, () => {
    console.log('Server is listening on port 3000');
});
