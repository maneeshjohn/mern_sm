const gravatar = require('gravatar');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const key = require('../../config/config').secretKey;
const User = require('../models/User');

const usersController = {
  registerNewUser: function(req, res){
    User.findOne({ email: req.body.email })
      .then(user => {
        if(user) {
          return res.status(400).json({ email: 'Email already exists' });
        } else {
          const avatar = gravatar.url(req.body.email, {
            s: '200',
            r: 'pg',
            d: 'mm'
          });

          const newUser = new User({
            name: req.body.name,
            email: req.body.email,
            avatar,
            password: req.body.password
          })

          bcrypt.genSalt(10, (err, salt) => {
            bcrypt.hash(newUser.password, salt, (err, hash) => {
              if(err) throw err;
              newUser.password = hash;
              newUser.save()
                .then(user => res.json(user))
                .catch(err => res.send(err));
            })
          })
        }
      })
  },

  loginUser: function(req, res){
    const email = req.body.email;
    const password = req.body.password;

    User.findOne({email})
      .then(user => {
        if(!user) {
          return res.status(404).json({ email: "User doesn't exist" });
        }
        bcrypt.compare(password, user.password)
          .then(success => {
            if(success) {
              const payload = { id: user.id, name: user.name, avatar: user.avatar };
              jwt.sign(
                payload,
                key,
                { expiresIn: 3600 }, (err, token) => {
                  res.json({ success: true, token: `Bearer ${token}` })
                })
            } else {
              return res.status(400).json({ msg: 'Invalid password' });
            }
          })
      })
  }
}

module.exports = usersController;