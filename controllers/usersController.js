var db = require('../models');
var User = require('../models/user');



function signup (req, res) {
    res.render('signup');
};

function login(req, res) {
    res.render('login');
};



 function sessions(req, res) {
    // call authenticate function to check if password user entered is correct
    User.authenticate(req.body.email, req.body.password, req.body.phoneNumber, function(err, user) {
        if (user) {
            req.session.userId = user._id;
            res.redirect('/profile');
        } else {
            res.redirect('/login');
        }
    });
};

function profile(req, res) {

    // find the user currently logged in
    User.findOne({
        _id: req.session.userId
    }, function(err, currentUser) {
        res.render('profile.ejs', {
            user: currentUser
        })
    });
};

function users (req, res) {
    // use the email and password to authenticate here
    User.createSecure(req.body.email, req.body.password, req.body.phoneNumber, function(err, user) {
        res.redirect('/login');
    });
};


//route to log out of account
 function logout (req, res) {
    // remove the session user id
    req.session.userId = null;
    // redirect to login (for now)
    req.user = null;
    res.redirect('/login');
};

function validation (req, res, next) {
    req.currentUser = function(callback) {
        User.findOne({
            _id: req.session.userId
        }, function(err, user) {
            if (!user) {
                callback("No User Found", null)
            } else {
                req.user = user;
                callback(null, user);
            }
        });
    }

    next();
};






module.exports = {
  signup: signup,
  login: login,
  sessions:sessions,
  profile: profile,
  users: users,
  logout: logout,
  validation: validation

};
