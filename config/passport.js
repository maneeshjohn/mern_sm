const PassportJwt = require('passport-jwt');
const mongoose = require('mongoose');
const secret = require('./config').secretKey;

const JwtStrategy = PassportJwt.Strategy;
const ExtractJwt = PassportJwt.ExtractJwt;
const User = mongoose.model('users');

const options = {};
options.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
options.secretOrKey = secret;

module.exports = passport => {
  passport.use(
    new JwtStrategy(options, (payload, done) => {
      User.findById(payload.id)
        .then(user => {
          if(user) {
            return done(null, user)
          }
          return done(null, false);
        })
        .catch(err => console.log(err));
    })
  )
}