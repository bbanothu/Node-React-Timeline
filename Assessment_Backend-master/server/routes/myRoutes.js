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
module.exports = sample;