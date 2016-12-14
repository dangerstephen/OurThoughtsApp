var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

var ThoughtSchema = new Schema({
  description: String,
  category: String
});

var Thought = mongoose.model('Thought', ThoughtSchema);

module.exports = Thought;
