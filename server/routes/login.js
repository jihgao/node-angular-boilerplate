'use strict';
module.exports = function (app, passport) {
    var lc = require('../controllers/login');
    app.get('/api/v1/whoami', lc.whoami);
    app.post('/api/v1/user/login', function (req, res, next) {
        passport.authenticate('local', function (err, user, info) {
            if (err) return next(err);
            if (!user) return res.send(401);
            req.logIn(user, function (err) {
                if (err) return next(err);
                return res.send({success:1, data:{cookieKey:'CLICKPLUS_COOKIE_IDENTIFICATION', expiryDate:1, accessToken: '12c2585bd248a23b9b09d82b691fe1e7'}});
            });
        })(req, res, next);
    });
    app.post('/api/v1/user/logout', function(req, res){
      req.logout();
      lc.logout();
      res.redirect('/login');
    });
};
