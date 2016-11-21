var mongoose = require("mongoose");
mongoose.connect(process.env.MONGODB_URI);

module.exports.Thought = require("./thought.js");
// module.exports.User = require("./thought.js");
