//! make api password in gmail account
//! use that api password  , if you are using api password , and your mail, it automatically allows unsecure app

const dotenv = require('dotenv');
dotenv.config({ path: '../configs/config.env' });

const nodemailer = require('nodemailer');

let transporter = nodemailer.createTransport({
  host: process.env.EMAIL_HOST,
  port: process.env.EMAIL_PORT,
  secure: false, //true for 465, false for other ports
  auth: {
    user: process.env.EMAIL_USER, //admin gmail id
    pass: process.env.EMAIL_PASS, //admin gmail password
  },
});

//? usage direction

//  const transporter = require('../config/emailConfig');

// const emailContent = {
//   subjectTitle: 'Please verify your email to activate your account',
//   bodyContent: template1,
// };

// try {
//   let info = await transporter.sendMail({
//     from: process.env.EMAIL_FROM,
//     to: email,
//     subject: emailContent.subjectTitle,
//     html: emailContent.bodyContent,
//   });
//   res.status(200).json({
//     success: true,
//     message: 'email send successfully',
//   });
// } catch (err: any) {
//   next(new ErrorHandler('Error occured while sending email', 400));
// }

//? empty named export to ignore "typescript redecalred variable" error
export = { transporter };
