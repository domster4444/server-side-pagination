const app = require('./app');

//! handlling uncaught exception error
process.on('uncaughtException', (err: any) => {
  console.log(` Error : ${err.message}`);
  console.log('Shutting down server due to uncaught error');
  process.exit(1);
});

//todo: connect to database
// const connect = require('configs/database');
// connect();

//todo: listen to port
console.log('server working fine');
//@ts-ignore
const server = app.listen(process.env.PORT, () => {
  console.log('server is working on port ' + process.env.PORT);
});

//! handling unhandled promise rejections
process.on('unhandledRejection', (err: any) => {
  console.log(`Error: ${err.message}`);
  console.log('Shutting down server due to unhandled rejection error');
  process.exit(1);
});
