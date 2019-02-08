const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const passport = require('passport');
const indexRoute = require('./routes/index');

const app = express();
const db = require('./config/config').dbURI;

//  BodyParser middlewares
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

mongoose.connect(db)
  .then(() => console.log('connected successfully to db...'))
  .catch(err => console.log(err));

//  Passport middleware
app.use(passport.initialize());

//  Passport configuration
require('./config/passport')(passport);

app.use('/api', indexRoute);

const port = process.env.PORT || 4000;
app.listen(port, () => console.log(`Server listening on port ${port}`));