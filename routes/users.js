const express = require('express');

const usersController = require('../api/controllers/usersController')

const router = express.Router();

router.get('/', (req, res) => res.send('User works'));

router.post('/register', (req, res) => usersController(req, res));

module.exports = router;