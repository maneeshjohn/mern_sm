const Post = require('../models/Post');
const Profile = require('../models/Profile');

const validation = require('../../config/validation/postValidation');

const postsController = {

  createPost: function(req, res) {

    const { errors, valid } = validation.newPostValidation(req.body);
    if(!valid){
      return(res.status(400).json(errors));
    }

    const newPost = new Post({
      user:req.user.id,
      content: req.body.content,
      name: req.body.name,
      avatar: req.body.avatar
    });
    
    newPost.save()
      .then(post => res.json(post))
      .catch(err => res.status(400).send(err.message));
  },

  getAllPosts: function(req, res) {
    Post.find()
      .sort({ date: -1 })
      .then(posts => res.json(posts))
      .catch(err => res.status(404).json(err.message));
  },

  getSinglePost: function(req, res) {
    Post.findById(req.params.id)      
      .then(post => res.json(post))
      .catch(err => res.status(404).json(err.message));
  },

  deletePost: function(req, res) {
    
    Profile.findOne({ user: req.user.id })
      .then(profile => {
        Post.findById(req.params.id)
          .then(post => {
            if(post.user.toString() !== req.user.id){
              return res.status(404).json({ error: 'Unauthorized request' });
            }
            post.remove()
              .then(() => res.json({ done: true }))
              .catch(err => res.status(400).json({ error: 'Post cannot be deleted' }));
          })
          .catch(err => res.status(400).json({ error: 'Post not found' }));          
      })
      .catch(err => res.status(400).json({ error: 'User not found' }));
  }
}

module.exports = postsController;