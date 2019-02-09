const express = require('express');
const passport = require('passport');

const profileController = require('../api/controllers/profileController');
const router = express.Router();

router.get('/', passport.authenticate('jwt', { session: false }), (req, res) => profileController.getProfile(req, res));

router.get('/handle/:handle', (req, res) => profileController.getProfileByHandle(req, res));

router.get('/user/:user_id', (req, res) => profileController.getProfileById(req, res));

router.get('/users', passport.authenticate('jwt', { session: false }), (req, res) => profileController.getAllProfiles(req, res));

router.post('/', passport.authenticate('jwt', { session: false }), (req, res) => profileController.updateProfile(req, res));

module.exports = router;