const express = require('express');
const passport = require('passport');

const postsController = require('../api/controllers/postsController');
const router = express.Router();

router.post('/', passport.authenticate('jwt', { session: false }), (req, res) => postsController.createPost(req, res));

router.get('/', passport.authenticate('jwt', { session: false }), (req, res) => postsController.getAllPosts(req, res));

router.get('/:id', passport.authenticate('jwt', { session: false }), (req, res) => postsController.getSinglePost(req, res));

router.delete('/:id', passport.authenticate('jwt', { session: false }), (req, res) => postsController.deletePost(req, res));

router.post('/like/:id', passport.authenticate('jwt', { session: false }), (req, res) => postsController.likePost(req, res));

router.post('/comment/:id', passport.authenticate('jwt', { session: false }), (req, res) => postsController.addComment(req, res));

router.delete('/comment/:id/:com_id', passport.authenticate('jwt', { session: false }), (req, res) => postsController.removeComment(req, res));

module.exports = router;
