var mongoose = require("mongoose");
// <<<<<<< HEAD
mongoose.connect('process.env.MONGODB_URI');
// =======
mongoose.connect(process.env.MONGODB_URI);
// >>>>>>> c70108bcb067c570f7e19a8a0eeabd47c10e9096

module.exports.Thought = require("./thought.js");
// module.exports.User = require("./thought.js");
