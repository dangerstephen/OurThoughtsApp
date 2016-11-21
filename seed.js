var db = require('./models');

var thoughts_list = [{
        description: "You're Great :P and dont you forget it.",
        category: "Happy"
    }, {
        description: "You need some MAJOR work.",
        category: "Sad"
    }, {
        description: "I'm hungry",
        category: "Weird"
    }, {
        description: "Knock Knock",
        category: "Funny"
    },

];


// remove all records that match {} -- which means remove ALL records
db.Thought.remove({}, function(err, thoughts) {
    if (err) {
        console.log('Error occurred in remove', err);
    } else {
        console.log('removed all thoughts');
        // create new records based on the array thoughts_list
        db.Thought.create(thoughts_list, function(err, thoughts) {
            if (err) {
                return console.log('err', err);
            }
            console.log("created", thoughts.length, "thoughts");
            process.exit();
        });
    }
});
