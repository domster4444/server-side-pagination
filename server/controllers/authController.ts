import { Request, Response } from 'express';

const ErrorHandler = require('../utils/errorHandler.ts');
const catchAsyncErrors = require('../middlewares/catchAsyncErrors');

exports.registerUser = catchAsyncErrors(
  async (req: Request, res: Response, next: any) => {
    res.status(200).json({
      success: true,
      message: 'you have hit the register route',
    });
  }
);
