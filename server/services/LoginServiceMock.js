'use strict';

var Q = require('q');
var users = [
    {
        "username": "18911340001",
        "password": '123456'
    },
    {
        "username": "admin",
        "password": 'admin'
    }
];

exports.whoami = function (username) {

    var deferred = Q.defer();
    for (var i = 0; i < users.length; i++) {
        if (users[i].username === username) {
            deferred.resolve({username: users[i].username});
        }
    }
    return deferred.promise;
};

exports.login = function (username, password, sessionId) {
    var deferred = Q.defer();
    var found = false;
    for (var i = 0; i < users.length; i++) {
        if (users[i].username === username && password === users[i].password) {
            found = true;
            deferred.resolve({username: users[i].username});
        }
    }
    if (!found) {
        deferred.reject('Authentication failed.');
    }
    return deferred.promise;
};

exports.logout = function (username, sessionId) {
    var deferred = Q.defer();
    deferred.resolve();
    return deferred.promise;
};
