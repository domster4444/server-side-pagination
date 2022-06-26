//? types import
import { Model, Schema, Document } from 'mongoose';

const mongoose = require('mongoose');
const crypto = require('crypto');

interface ItestSchema extends Document {
  name: string;
  email: string;
  role: string;
  hashed_password: string;
  salt: string;
  resetPasswordLink: string;
}

//user schema
const testSchema: Schema = new Schema<ItestSchema>(
  {
    name: {
      type: String,
      trim: true,
      required: [true, 'Please add a name'],
      lowercase: true,
      // unique: true,
      maxlength: [50, 'Name can not be more than 50 characters'],
      minlength: [3, 'Name must be at least 3 characters'],
    },

    email: {
      type: String,
      trim: true,
      required: [true, 'Please add an email'],
      lowercase: true,
      unique: true,
    },

    role: {
      type: String,
      enum: ['subscriber', 'admin'],
      default: 'subscriber', //? if you type default then required is not necessary
    },

    hashed_password: {
      type: String,
      trim: true,
      required: [true, 'please add a password'],
      // lowercase:true,
      // unique:true,
      maxlength: [50, 'password cant be more than 50 characters'],
      minlength: [3, 'password must be at least 3 characters'],
    },

    salt: String, //? it tells us how strong the password is hashed.

    resetPasswordLink: {
      data: String,
      default: '',
    },
  },
  { timestamps: true } //? if something happens in this user model, then timestamp will be created for that. ie. createdAt, updatedAt field will be created automatically
);

// virtual field:-
// T - type
// T - trim
// R - required
// L - lowercase
// U - unique
// MAX - maxlength
// MIN - minlength
// ENUM  - enum
// DEFAUlt - default (if you type default then required is not necessary)

//! ==============================   VIRTUAL METHODS =================================
//todo: virtual field, that take password in string format and hash it and send db as hashed_password property.
testSchema
  .virtual('password') // this virtual method is going to take the "password"
  .set(function (password: any) {
    // now after this virtual method takes "password", we going to use set function that will hash that "password" that we got and then save in database with field name "hashed_password"
    this._password = password;
    //? salt is present in the schema.
    // => sets the salt field  in userSchema with the value returned from makeSalt method
    this.salt = this.makeSalt();
    //? hashed_password is present in the schema.
    // => sets the hashed_password field  in userSchema with the value returned from encryptPassword method
    this.hashed_password = this.encryptPassword(password);
  })
  .get(function () {
    return this._password; //? this is going to return the "password" in text format
  });

//! ==============================   METHODS =================================
testSchema.methods = {
  makeSalt: function () {
    return Math.round(new Date().valueOf() * Math.random()) + '';
  },
  encryptPassword: function (password: string) {
    // if not password then our encrypt method will return empty string
    if (!password) {
      return '';
    }
    // this is going to return the hashed password
    try {
      //@ts-ignore
      return createHmac('sha1', this.salt).update(password).digest('hex');
    } catch (err) {
      // if error occurs while hashing password, it will return empty string
      return '';
    }
  },

  compareWithEncryptedPassword: function (password: string) {
    return this.encryptPassword(password) === this.hashed_password;
  },
};

const Test: Model<ItestSchema> = mongoose.model('Test', testSchema);

module.exports = Test;
