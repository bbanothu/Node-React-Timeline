// Requires
const express = require('express');
const sample = express.Router();
// Controllers
const sampleController = require('../controllers').sampleController;

sample.post('/sampleEndpoint', sampleController.sampleEndpoint);
module.exports = sample