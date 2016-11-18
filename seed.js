var db = require('./models');

// var allThoughts = [];

var thoughts_list= [
  {
    description: "youre great dont forget that",
    category: "happy"
  }, {
    description: "you need some major work.",
    category: "sad"
  },
  {
    description: "im hungry",
    category: "weird"
  },
  {
    description: "knock knock",
    category: "funny"
  },

];


// remove all records that match {} -- which means remove ALL records
db.Thought.remove({}, function(err, thoughts){
  if(err) {
    console.log('Error occurred in remove', err);
  } else {
    console.log('removed all thoughts');
    // create new records based on the array thoughts_list
    db.Thought.create(thoughts_list, function(err, thoughts){
      if (err) { return console.log('err', err); }
      console.log("created", thoughts.length, "thoughts");
      process.exit();
    });
  }
});
