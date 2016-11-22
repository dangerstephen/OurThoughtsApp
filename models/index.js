var mongoose = require("mongoose");
mongoose.connect('mongodb://localhost/simple-login');

module.exports.Thought = require("./thought.js");
