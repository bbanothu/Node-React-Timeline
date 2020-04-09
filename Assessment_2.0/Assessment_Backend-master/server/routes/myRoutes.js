// Requires
const express = require('express');
const sample = express.Router();
// Controllers
const myController = require('../controllers').Controller;


//// All get functions
sample.get('/sampleEndpoint', myController.sampleEndpoint);
sample.get('/getAllPosts', myController.getAllPosts);

//// All post functions
sample.post('/createPost', myController.createPost);
sample.post('/incLikes', myController.incLikes);
sample.post('/decLikes', myController.decLikes);
sample.post('/deletePost', myController.deletePost);
sample.post('/createUser', myController.createUser);
sample.post('/loginUser', myController.loginUser);
module.exports = sample;