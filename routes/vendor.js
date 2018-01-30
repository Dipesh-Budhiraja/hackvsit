const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    res.send('vendor home');
});

module.exports = router;