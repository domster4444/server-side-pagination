import { Request, Response } from 'express';

const express = require('express');
const router = express.Router();

const { testValidator } = require('../middlewares/validators/testValidator');

const { testControl } = require('../controllers/testController');

//todo: middleware to protect routes
const checkIfTestTokenSentInHeader = require('../middlewares/checkIfTestTokenSentInHeader');

router.use('/test', checkIfTestTokenSentInHeader); //!this auth middleware is triggered before hitting /changepassword route

router.route('/test').post(testValidator, testControl);

module.exports = router;
