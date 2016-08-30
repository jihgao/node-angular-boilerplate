'use strict';

var Q = require('q');
var fs = require('fs');
var path = require('path');
var UserService = function() {};
var monkService = function(monkDataPath){
  var deferred = new Q.defer();
  deferred.resolve(require(monkDataPath));
  return deferred.promise;
};

UserService.prototype.getItems = function() {
    return monkService('../monk_data/userList.json');
};

UserService.prototype.getUserInfo = function(){
    return monkService('../monk_data/indexUserInfo.json');
};

module.exports = UserService.prototype;
