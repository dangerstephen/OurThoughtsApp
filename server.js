// server.js

// require express framework and additional modules
var express = require('express'),
  app = express(),
  bodyParser = require('body-parser'),
  mongoose = require('mongoose'),
  session = require('express-session');;

// middleware
app.use(express.static('public'));
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({extended: true}));
mongoose.connect('mongodb://localhost/simple-login');

//middleware for session
app.use(session({
  saveUninitialized: true,
  resave: true,
  secret: 'SuperSecretCookie',
  cookie: { maxAge: 30 * 60 * 1000 } // 30 minute cookie lifespan (in milliseconds)
}));


var User = require('./models/user');


// signup route (renders signup view)
app.get('/signup', function (req, res) {
  res.render('signup');
});

// login route with placeholder response
app.get('/login', function (req, res) {
  res.render('login');
});

app.post('/sessions', function (req, res) {
  // call authenticate function to check if password user entered is correct
  User.authenticate(req.body.email, req.body.password, req.body.phoneNumber, function (err, user) {
    req.session.userId = user._id;
    res.redirect('/profile');
  });
});

//shows user profile page
app.get('/profile', function (req, res) {
  // find the user currently logged in
  User.findOne({_id: req.session.userId}, function (err, currentUser) {
    res.render('profile.ejs', {user: currentUser})
  });
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
