'use strict';
var ensureLoggedIn = function (req, res, next) {

    if(req.path !== '/v1/user/login'){
      if (!req.isAuthenticated || !req.isAuthenticated()) {
        return res.send(401);
      } else {
          next();
      }
    }else{
          next();
    }
};

module.exports = function (app, passport) {
    app.use('/api', ensureLoggedIn);
    require('./login')(app, passport);
};
