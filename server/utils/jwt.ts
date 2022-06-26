const jwt = require('jsonwebtoken');

//! ======================================================CREATE GENERAL JWT TOKEN WITH server secret key
exports.createGeneralJWT = (
  dataToStoreInToken: any,
  secret: string,
  expireDate: string = '15d'
) => {
  try {
    const token = jwt.sign({ data: dataToStoreInToken }, secret, {
      expiresIn: expireDate,
    });
    console.log(token);
    return token;
  } catch (err: any) {
    console.log('error occured while creating general jwt token');
    console.log(err);
    return err;
  }
};
//? USAGE DIRECTION
// const myToken = await createGeneralJWT(
//   { name: 'shahid' },
//   'SECRET123',
//   '15d'
// );
// console.log(myToken); // your long token

//! =======================================================CREATE UNIQUE TOKEN FOR EACH USER (for forgot password RESET LINK TOKEN)

//* ESPECIALLY USED FOR PASSWORD forgot password RESET LINK TOKEN , unique secret for each user to reset password
//* If userId is not mixed with token, and if hacker stole our secretkey of server, he/she can reset password of any user
//* So, every token is unique for each user
exports.createToken = (
  dataToStoreInToken: any,
  userid: any,
  secret: string,
  expireDate: string = '15d'
) => {
  try {
    //? EVEN IF SECRET KEY OF SERVER IS STOLEN, still hacker need to have access to userid
    //? To make each token unique for each user, we will mix userid with our server's secret key
    const uniqueSecretKeyForEachUser = userid + secret; //! You gonna need both "userid & secret" later to verify the token
    const token = jwt.sign(
      { data: dataToStoreInToken },
      uniqueSecretKeyForEachUser,
      {
        expiresIn: expireDate,
      }
    );
    console.log(token);
    return token;
  } catch (err: any) {
    console.log('error occured while creating unique for each user token');
    console.log(err);
    return err;
  }
};

//! ============================================================ Verify if token is valid  & get data inside it
exports.verifyToken = (
  tokenToBeVerified: string,
  secretKeyUsedForCreatingToken: string
) => {
  try {
    const dataStoredInsideJWT = jwt.verify(
      tokenToBeVerified,
      secretKeyUsedForCreatingToken
    );
    return dataStoredInsideJWT;
  } catch (err: any) {
    console.log('TOKEN IS NOT VALID');
    console.log(err);
    return false;
  }
};

//? USE DIRECTION
// const verificationResult = await verifyToken(
//   'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7Im5hbWUiOiJzaGFoaWQifSwiaWF0IjoxNjU2MTUyNjg3LCJleHAiOjE2NTc0NDg2ODd9.DvlkBtbuHpO7MvHyMUV66BylbJp7W0FUik6XNHwm3XQ',
//   'SECRET123'
// );
// console.log(verificationResult); // data stored inside jwt in obj format
