// server.js

// require express framework and additional modules
var express = require('express'),
  app = express(),
  bodyParser = require('body-parser'),
  mongoose = require('mongoose');

// middleware
app.use(express.static('public'));
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({extended: true}));
mongoose.connect('mongodb://localhost/simple-login');


var User = require('./models/user');


// signup route (renders signup view)
app.get('/signup', function (req, res) {
  res.render('signup');
});

// login route with placeholder response
app.get('/login', function (req, res) {
  res.send('login coming soon');
});


// A create user route - creates a new user with a secure password
app.post('/users', function (req, res) {
  // use the email and password to authenticate here
  User.createSecure(req.body.email, req.body.password, req.body.phoneNumber, function (err, user) {
    res.json(user);
  });
});


// listen on port 3000
app.listen(3000, function () {
  console.log('server started on locahost:3000');
});
