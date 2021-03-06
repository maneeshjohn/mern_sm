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
  },

  likePost: function(req, res) {
    
    Profile.findOne({ user: req.user.id })
      .then(profile => {
        Post.findById(req.params.id)
          .then(post => {
            const liked = post.likes.filter(item => item.user.toString() === req.user.id).length > 0;            
            if(liked) {
              const index = post.likes.map( item => item.user.toString()).indexOf(req.user.id);
              post.likes.splice(index, 1);
              post.save();
              return res.json(post);
            }

            post.likes.push({ user: req.user.id });
            post.save()
              .then(() => res.json({post}));
          })
          .catch(err => res.status(400).json({ error: 'Post not found' }));          
      })
      .catch(err => res.status(400).json({ error: 'User not found' }));
  },

  addComment: function(req, res) {

    const { errors, valid } = validation.commentValidation(req.body);
    if(!valid) {
      return res.status(400).json(errors);
    }
        
    Post.findById(req.params.id)
      .then(post => {
        const newComment = {
          content: req.body.content,
          name: req.body.name,
          avatar: req.body.avatar,
          user: req.user.id
        };

        post.comments.unshift(newComment);
        post.save()
          .then(post => res.json(post))
          .catch(err => res.status(400).json({ error: 'Comment could not be added' }));
      })
      .catch(err => res.status(404).json({ error: 'Post not found' }))
  },

  removeComment: function(req, res) {
        
    Post.findById(req.params.id)
      .then(post => {
        const comment = post.comments.filter(item => item._id.toString() === req.params.com_id).length > 0;
        if(!comment) {
          return res.status(404).json({ error: 'Comment not found '})
        }

        const index = post.comments.map(item => item._id.toString()).indexOf(req.params.com_id);
        post.comments.splice(index, 1);
        post.save()
          .then(post => res.json(post))
          .catch(err => res.status(400).json({ error: 'Comment could not be deleted' }));
      })
      .catch(err => res.status(404).json({ error: 'Post not found' }))
  }
}

module.exports = postsController;