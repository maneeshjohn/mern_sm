const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const indexRoute = require('./routes/index');

const app = express();
const db = require('./config/config').dbURI;

//  BodyParser middlewares
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json())

mongoose.connect(db)
  .then(() => console.log('connected successfully to db...'))
  .catch(err => console.log(err));

app.get('/', (req, res) => res.send('Hello'))

app.use('/api', indexRoute);

const port = process.env.PORT || 4000;
app.listen(port, () => console.log(`Server listening on port ${port}`));