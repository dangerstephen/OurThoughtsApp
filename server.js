var db = require('./models');

var express = require('express'),
    app = express(),
    bodyParser = require('body-parser'),
    mongoose = require('mongoose'),
    session = require('express-session');

app.use(express.static('public'));
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({
    extended: true
}));

app.use(session({
    saveUninitialized: true,
    resave: true,
    secret: 'SuperSecretCookie',
    cookie: {
        maxAge: 30 * 60 * 1000
    }
}));

var controllers = require('./controllers');

app.get('/', function(req, res) {
    res.sendFile(__dirname + '/views/index.html');
});

app.get('/templates/:name', function templates(req, res) {
  var name = req.params.name;
  res.sendFile(__dirname + '/views/templates/' + name + '.html');
});

app.get('/signup', controllers.users.signup);
app.get('/login', controllers.users.login);
app.post('/sessions', controllers.users.sessions);
app.get('/profile', controllers.users.profile);
app.post('/users', controllers.users.users);
app.get('/logout', controllers.users.logout);
app.use('/', controllers.users.validation);

app.get('/api', controllers.api.index);
app.get('/api/thoughts', controllers.thoughts.index);
app.get('/api/thoughts/:id', controllers.thoughts.show);
app.post('/api/thoughts', controllers.thoughts.create);
app.delete('/api/thoughts/:id', controllers.thoughts.destroy);
app.put('/api/thoughts/:id', controllers.thoughts.update);

app.get('*', function homepage (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});

app.listen(process.env.PORT || 3000, function() {
    console.log('server started on locahost:3000');
});
