// =================================joi validation package=======================

const Joi = require('@hapi/joi');
//todo:  testValidator
const testValidator = (formData: any) => {
  console.log(
    '@hapi/joi - validator for testValidator.ts trigerred to check email & confirmEmail'
  );
  const schema = Joi.object({
    email: Joi.string()
      .email()
      .min(15)
      .max(20)
      .pattern(
        new RegExp(
          /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
        )
      )
      .required(),
    confirmEmail: Joi.ref('email'), // after using .ref() func , you cannot use .required()
  });

  return schema.validateAsync(formData); //? if formData not valid then return error
};

//todo:  other validators......
// const loginValidation = (formData: any) => {};

module.exports = { testValidator };

//! NOTE: Joi is very specific, if you provide any other field, it will throw an error.
