const express = require('express');

let router = express.Router();
// router is same as app.use but it's more specific about route
router.get('/', (req, res) => {
    res.send('Hello from router');
});
router.get('/about', (req, res) => {
    res.send('About us');
});
router.get('*', (req, res) => {
    res.send('404 not found');
});

module.exports = router; // export router to be used in other files