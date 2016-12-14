var db = require('./models');

var thoughts_list = [];
thoughts_list.push({
        description: "You're Great :P and dont you forget it.",
        category: "Happy"
    });
    thoughts_list.push({
        description: "You need some MAJOR work.",
        category: "Sad"
    });
     thoughts_list.push({
        description: "I'm hungry",
        category: "Weird"
    });
    thoughts_list.push({
        description: "Knock Knock",
        category: "Funny"
    });

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
