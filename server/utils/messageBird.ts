//? --------------------------------------<<our message bird live api key for sms api>>
const messagebird = require('messagebird')('');

var params = {
  originator: 'TestMessage',
  recipients: ['+9779807963089'],
  body: 'This is a test message',
};

messagebird.messages.create(params, function (err: any, response: any) {
  if (err) {
    return console.log(err);
  }
  console.log(response);
});
