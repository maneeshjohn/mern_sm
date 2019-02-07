const express = require('express');

const usersController = require('../api/controllers/usersController');
const router = express.Router();

router.get('/', (req, res) => res.send('User works'));

router.post('/register', (req, res) => usersController.registerNewUser(req, res));

router.post('/login', (req, res) => usersController.loginUser(req,res));

module.exports = router;