const gravatar = require('gravatar');
const bcrypt = require('bcryptjs');

const User = require('../models/User');

const userController = (req, res) => {
  User.findOne({ email: req.body.email })
    .then(user => {
      if(user) {
        return res.status(400).json({ email: 'Email already exists' });
      } else {
        const avatar = gravatar.url(req.body.email, {
          s: '200',  //  sixe
          r: 'pg',  //  rating
          d: 'mm'  //  default
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
}

module.exports = userController;