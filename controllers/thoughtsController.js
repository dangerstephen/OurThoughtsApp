var db = require('../models');



function index(req, res) {
    db.Thought.find(function(err, thoughts) {
        if (err) {
            return console.log("index error: " + err);
        }
        res.json(thoughts);
    });
};

function show(req, res) {
    db.Thoughts.findOne({
        _id: req.params._id
    }, function(err, data) {
        res.json(data);
    });
};

function create(req, res) {
    console.log('thoughts create', req.body);
    var newThought = new db.Thought(req.body);
    newThought.save(function handleDBThoughtSaved(err, savedThought) {
        res.json(savedThought);
        myMessage = "\"" + 'New Thought: ' + newThought.description + ' Category: ' + newThought.category + "\"";


        // client.messages.create({
        //
        //     to: numberToText,
        //     from: twilloNumber,
        //     body: myMessage,
        // }, function(err, message) {
        //     console.log(message.sid);
        // });
    });

};

function destroy(req, res) {
    console.log('thoughts delete', req.params);
    var thoughtId = req.params.id;
    db.Thought.findOneAndRemove({
        _id: thoughtId
    }, function(err, deletedThought) {
        res.json(deletedThought);
    });
};

function update(req, res) {
    db.Thought.findOne({
        _id: req.params.id
    }, function(err, selectedThought) {
        selectedThought.description = req.body.description,
            selectedThought.category = req.body.category
        selectedThought.save(function(err, savedUpdate) {
            if (err) {
                return console.console.log(err);
            }
            res.json(savedUpdate);
        });
    });
};

module.exports = {
    index: index,
    create: create,
    show: show,
    destroy: destroy,
    update: update
};
