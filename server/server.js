'use strict';
var os = require('os');
var dns = require('dns');
var express = require('express');
var passport = require('passport');
var session = require('cookie-session');
var cookieParser = require('cookie-parser');
var bodyParser = require("body-parser");
var LocalStrategy = require('passport-local').Strategy;
var path = require('path');
var http = require('http');
var Q = require('q');
var Path = require('path');

var LoginService = require('./services/LoginServiceMock'); //TODO: will replace it with process.env.NODE_ENV
var publicDir = path.normalize(path.join(__dirname, '..', 'public'));
var app = express();

// Passport config
passport.serializeUser(function (user, done) {
    done(null, user);
});

passport.deserializeUser(function (user, done) {
    done(null, user);
});

app.disable('x-powered-by');

passport.use(new LocalStrategy({passReqToCallback: true},
        function (req, username, password, done) {
            LoginService.login(username, password, req.cookies['express:sess']).then(function (user) {
                return done(null, {
                    username: user.username,
                    authToken: new Buffer(username + ':' + password).toString('base64')
                });
            }, function () {
                return done(null, false, {
                    message: 'Invalid login'
                });
            });
        }
    )
);

app.use(cookieParser());
app.use(session({secret: require('crypto').randomBytes(20).toString('base64')}));
app.use(passport.initialize());
app.use(passport.session());
app.use(express.static(publicDir, {'redirect': false}));
app.use(bodyParser({limit: '1024kb'}));

app.get('/', function (req, res) {
    res.sendfile(path.join(publicDir, 'index.html'));
});

app.get('/login', function (req, res) {
    res.sendfile(path.join(publicDir, 'login.html'));
});

require('./routes')(app, passport);

var server = app.listen(3000, '0.0.0.0', function () {
    console.log("server started at http://127.0.0.1:3000");
});
