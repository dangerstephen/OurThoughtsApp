// require dependencies
var mongoose = require('mongoose'),
  bcrypt = require('bcrypt');

// set up shorthand method name
var Schema = mongoose.Schema;

// define user schema
var UserSchema = new Schema({
  email: String,
  passwordDigest: String,
  phoneNumber: String
});



// create a new user with secure (hashed) password
UserSchema.statics.createSecure = function (email, password, phoneNumber, callback) {
// `this` references our user model, since this function will be called from the model itself
// store it in variable `UserModel` because `this` changes context in nested callbacks

var UserModel = this;

// hash password user enters at sign up
bcrypt.genSalt(function (err, salt) {
  console.log('salt: ', salt);  // changes every time
  bcrypt.hash(password, salt, function (err, hash) {

    // create the new user (save to db) with hashed password
    UserModel.create({
      email: email,
      passwordDigest: hash,
      phoneNumber: phoneNumber
    }, callback);
  });
});
};


var User = mongoose.model('User', UserSchema);

// export user model
module.exports = User;
