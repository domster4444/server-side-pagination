// =================================Validator package=======================
import { Request, response, Response } from 'express';

const Validator = require('validator');
const isEmpty = require('is-empty');

const ErrorHandler = require('../../utils/errorHandler');

//todo: test Validator
exports.testValidator = function (req: Request, res: Response, next: any) {
  console.log(
    'validator - validator  for testValidator.ts triggered to check for testData & testDescription '
  );
  let { testData, testDescription } = req.body;

  //? if empty then, let value be ""
  testData = !isEmpty(testData) ? testData : '';
  testDescription = !isEmpty(testDescription) ? testDescription : '';

  // Validator.isEmpty(testData) is true if testData = ""
  if (Validator.isEmpty(testData)) {
    next(new ErrorHandler('Test data is required', 406));
  } else if (Validator.isEmpty(testDescription)) {
    next(new ErrorHandler('Test description is required', 406));
  } else {
    next();
  }
};
//todo: Other Validator .....
// exports.registerValidator = function (req: Request, res: Response, next: any) {};

// //! NOTE: Validator is not very specific, if you provide any other field, it will just ignore those extra fields provided
