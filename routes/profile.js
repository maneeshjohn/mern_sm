const express = require('express');
const passport = require('passport');

const profileController = require('../api/controllers/profileController');
const router = express.Router();

router.get('/', passport.authenticate('jwt', { session: false }), (req, res) => profileController.getProfile(req, res));

router.post('/', passport.authenticate('jwt', { session: false }), (req, res) => profileController.updateProfile(req, res));

module.exports = router;