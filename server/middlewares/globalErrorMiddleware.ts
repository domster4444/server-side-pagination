//? middleware to handle exceptional  error that occurs in the server and hard to handle and track
const ErrorHandler = require('../utils/errorHandler');
import { Request, Response } from 'express';

const globalErrorMiddleware = (
  err: any,
  req: Request,
  res: Response,
  next: any
) => {
  //? if error exist but if its exception with no status code and no message then let 500 be status code and message be "Exceptional Error From Internal Server -msg from errorMiddleware"
  err.statusCode = err.statusCode || 500;
  err.message =
    err.message ||
    'Exceptional Error From Internal Server -msg from errorMiddleware';

  //? wrong MongoDb Id Error
  // if exception error occurs, and  errorobject's name propertyValue = "CastError" than let status code be 500 and message be "Invalid Id"
  if (err.name === 'CastError') {
    const message = `Resource not found. Invalid : ${err.path}`;
  }

  // Mongoose duplicate key error
  if (err.code === 11000) {
    const message = `Duplicate ${Object.keys(err.keyValue)} Entered`;
    err = new ErrorHandler(message, 400);
  }

  // Wrong JWT error
  if (err.name === 'JsonWebTokenError') {
    const message = `Json Web Token is invalid, Try again `;
    err = new ErrorHandler(message, 400);
  }

  // JWT EXPIRE error
  if (err.name === 'TokenExpiredError') {
    const message = `Json Web Token is Expired, Try again `;
    err = new ErrorHandler(message, 400);
  }

  res.status(err.statusCode).json({
    success: false,
    message: err.message,
  });
};

module.exports = globalErrorMiddleware;
