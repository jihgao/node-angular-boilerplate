var LoginService = require('../services/LoginServiceMock');


exports.login = function (req, res) {
        LoginService.login().then(function (result) {
            res.send(result);
        }, function (error) {
            res.send(error.statusCode, error);
        });
};


exports.logout = function (req, res) {
        LoginService.logout().then(function (result) {
            res.send(result);
        }, function (error) {
            res.send(error.statusCode, error);
        });
};


exports.whoami = function (req, res) {
        LoginService.whoami().then(function (result) {
            res.send(result);
        }, function (error) {
            res.send(error.statusCode, error);
        });
};
