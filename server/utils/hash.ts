const bcrypt = require('bcrypt');

const hashData = async (data: string) => {
  try {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(data, salt);
    return hashedPassword;
  } catch (err: any) {
    console.log('error occured while hashing password');
    console.log(err);
  }
};
//? DIRECTION OF USAGE
//   const myHashedData = await hashData('123456');
//   console.log(myHashedData);
// hashed password will be logged in console

const compareHashedData = async (data: string, hashedData: string) => {
  try {
    const comparisonResult = await bcrypt.compare(data, hashedData);
    return comparisonResult;
  } catch (err: any) {
    console.log('error occured while comparing password');
    return false;
  }
};
//? DIRECTION OF USAGE
//   const result = await compareHashedData(
//     '123456',
//     '$2b$10$ny58GoKAwPCO6JgGr18NhevhK5PeisLY9lHttvwVT2ReoFwzEiIhy'
//   );
//  true or false as result
