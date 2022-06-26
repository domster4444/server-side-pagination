const sgMail = require('@sendgrid/mail');
sgMail.setApiKey(process.env.SDGRIDKEY);

exports.sendEmail = async (
  receiverEmail: string,
  sendGridSenderEmail: string,
  dataToSend: { subjectTitle: string; bodyContent: any }
) => {
  const emailData = {
    from: sendGridSenderEmail,
    to: receiverEmail,

    subject: dataToSend.subjectTitle,
    html: dataToSend.bodyContent,
  };

  const result = await sgMail
    .send(emailData)
    .then((sentInfo: any) => {
      console.log(sentInfo);
      return true;
    })
    .catch((err: any) => {
      return false;
    });
  return result;
};

//? USAGE DIRECTION

// const emailSentStatus = await sendEmail(
//   email,
//   process.env.EMAILFROM,
//   emailContent
// );
// console.log(emailSentStatus);
// if (emailSentStatus) {
//   return res.status(200).json({
//     success: true,
//     message: 'Verification email sent successfully',
//   });
// } else {
//   return next(new ErrorHandler('Error occured while sending email', 500));
// }
