import { Request, Response } from 'express';

const ErrorHandler = require('../utils/errorHandler');
const catchAsyncErrors = require('../middlewares/catchAsyncErrors');

//? joi validator
const { testValidator } = require('../middlewares/validators/joiValidator');

type formData = {
  email: string;
  confirmEmail: string;
};

exports.testControl = catchAsyncErrors(
  async (req: Request, res: Response, next: any) => {
    //todo: JoiValidator , it will throw auto generated error as response
    const { email, confirmEmail }: formData = req.body;
    //specifically sending selected form data to joi, as joi will response as error if extra fields are provided in req.body

    //@ts-ignore
    const user = await req.testPrivateMiddlewareData;

    const formDataForValidation: formData = {
      email: email,
      confirmEmail: confirmEmail,
    };
    const joiValidationResult = await testValidator(formDataForValidation);

    const errorOccured: boolean = false;

    //@ts-ignore
    if (errorOccured === true) {
      next(new ErrorHandler('error thrown in testController', 400));
      /*
OUTPUT:
{
  success:false,
  message:'Something went wrong',
}
      */
    } else {
      res.status(200).json({
        success: true,
        message: `you have hit the test route  ${user}`,
      });
    }
  }
);

//todo: Other Control...
// exports.otherControl = catchAsyncErrors(async(req,res,next)=>{}))
