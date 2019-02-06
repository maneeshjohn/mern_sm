const express = require('express');
const app = express();

const users = require('./users');
const profile = require('./profile');
const posts = require('./posts');

app.use('/users', users);
app.use('/profile', profile);
app.use('/posts', posts);

module.exports = app;