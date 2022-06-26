async function connectToAtlas() {
  const mongoose = await require('mongoose');
  //* mongoose.connect(urlParam,{options to resolve depricated warninigs })
  let a = await mongoose
    .connect(process.env.DATABASE_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then((data: any) => {
      console.log('database connected successfully');
    })
    .catch((error: any) => {
      console.log(error.message);
      process.exit(1);
    });
}

module.exports = connectToAtlas;

//? useCase direction
// const connectDB = require('./configs/database');
// const DATABASE_URL = process.env.DATABASE_URL;
// connectDB(DATABASE_URL);
