const express = require('express');
const mongoose = require('mongoose');

const app = express();
const db = require('./config/config').dbURI;

mongoose.connect(db)
  .then(() => console.log('connected successfully to db...'))
  .catch(err => console.log(err));

app.get('/', (req, res) => res.send('Hello'))

const port = process.env.PORT || 4000;
app.listen(port, () => console.log(`Server listening on port ${port}`));