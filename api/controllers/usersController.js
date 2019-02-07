const gravatar = require('gravatar');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const key = require('../../config/config').secretKey;
const User = require('../models/User');
const validation = require('../../config/validation/userValidation');

const usersController = {
  registerNewUser: function(req, res){
    const { errors, valid } = validation.registerValidation(req.body);
    if(!valid) {
      return res.status(400).json(errors);
    }

    User.findOne({ email: req.body.email })
      .then(user => {
        if(user) {
          errors.email = "Email already exists";
          return res.status(400).json(errors);
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
    const { errors, valid } = validation.loginValidation(req.body);
    if(!valid) {
      return res.status(400).send(errors);
    }

    const email = req.body.email;
    const password = req.body.password;

    User.findOne({email})
      .then(user => {
        if(!user) {
          errors.email = "User doesn't exist";
          return res.status(404).json(errors);
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
              errors.password = 'Incorrect password';
              return res.status(400).json(errors);
            }
          })
      })
  }
}

module.exports = usersController;