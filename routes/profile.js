const express = require('express');
const passport = require('passport');

const profileController = require('../api/controllers/profileController');
const router = express.Router();

router.get('/', passport.authenticate('jwt', { session: false }), (req, res) => profileController.getProfile(req, res));

router.get('/handle/:handle', (req, res) => profileController.getProfileByHandle(req, res));

router.get('/user/:user_id', (req, res) => profileController.getProfileById(req, res));

router.get('/users', passport.authenticate('jwt', { session: false }), (req, res) => profileController.getAllProfiles(req, res));

router.post('/', passport.authenticate('jwt', { session: false }), (req, res) => profileController.updateProfile(req, res));

router.post('/experience', passport.authenticate('jwt', { session: false }), (req, res) => profileController.addExperience(req, res));

router.post('/education', passport.authenticate('jwt', { session: false }), (req, res) => profileController.addEducation(req, res));

router.delete('/education/:id', passport.authenticate('jwt', { session: false }), (req, res) => profileController.deleteEducation(req, res));

router.delete('/experience/:id', passport.authenticate('jwt', { session: false }), (req, res) => profileController.deleteExperience(req, res));

router.delete('/delete', passport.authenticate('jwt', { session: false }), (req, res) => profileController.deleteProfile(req, res));

module.exports = router;