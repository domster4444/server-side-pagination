import { Request, Response } from 'express';

const ErrorHandler = require('../utils/errorHandler');

var checkIfTestTokenSentInHeader = function (
  req: Request,
  res: Response,
  next: any
) {
  let token;

  const { authorization } = req.headers;
  if (authorization && authorization.startsWith('Bearer')) {
    try {
      token = authorization.split(' ')[1];
      if (token === 'invalidToken') {
        throw Error('invalid token');
      }

      //@ts-ignore
      req.testPrivateMiddlewareData =
        'DYNAMIC_DATA_OF_TEST_FROM_DB_PROVIDED_BY_PROTECTED_ROUTE_MIDDLEWARE';
      next();
    } catch (error) {
      console.log(error);
      next(new ErrorHandler('Invalid token  is provided', 401));
    }
  } else if (!token) {
    next(new ErrorHandler('No token is provided', 401));
  }
};

module.exports = checkIfTestTokenSentInHeader;
