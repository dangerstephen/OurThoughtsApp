var mongoose = require("mongoose");
mongoose.connect('mongodb://localhost/ourThoughts-app');

module.exports.Thought = require("./thought.js");
