const express = require('express');
const router = express.Router();

router.get('/', (req, res) => res.send('User works'));

module.exports = router;