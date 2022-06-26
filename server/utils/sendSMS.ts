//! ERROR WILL OCCUR IF YOU USE THIS FUNCTION WITHOUT UPDATING "twilioAuthTokenValue"
//? const client = require('twilio')('TwilioSidValue', 'twilioAuthTokenValue');
const client = require('twilio')(
  'AC0a1bd7c763e760d3f977ccc73c1100e8',
  '1503aaaa6e44cbf3705cf62a19f47f34'
);

const sendMessage = () => {
  client.messages
    .create({
      body: 'Hello from Node, Kshitiz Don haha',
      to: '+977 9807963089', //? Replace this ph no. with number to whom you want to send sms
      from: '+19897689220', //? this is our twilio number
    })
    .then((message: any) => {
      console.log(message.sid);
    })
    .catch((err: any) => {
      console.log(err);
    });
};

module.exports = sendMessage;

//? USAGE DIRECTION

// TWILIO SMS FUNCTION
// const sendMessage = require('../utils/sendSmsTwilio');
// sendMessage();
// res.status(200).json({
//   success: true,
//   message: 'SMS sent successfully using twilio',
// });
