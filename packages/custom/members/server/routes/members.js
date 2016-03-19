'use strict';

// Member authorization helpers
var hasAuthorization = function(req, res, next) {
    if (!req.user.isAdmin && !req.member.user._id.equals(req.user._id)) {
        return res.status(401).send('User is not authorized');
    }
    next();
};

var hasPermissions = function(req, res, next) {

    req.body.permissions = req.body.permissions || ['authenticated'];

    for (var i = 0; i < req.body.permissions.length; i++) {
        var permission = req.body.permissions[i];
        if (req.acl.user.allowed.indexOf(permission) === -1) {
            return res.status(401).send('User not allowed to assign ' + permission + ' permission.');
        }
    }

    next();
};

module.exports = function(Members, app, auth) {

    var members = require('../controllers/members')(Members);

    app.route('/api/members')
        .get(members.all)
        .post(auth.requiresLogin, hasPermissions, members.create);
    app.route('/api/members/:memberId')
        .get(auth.isMongoId, members.show)
        .put(auth.isMongoId, auth.requiresLogin, hasAuthorization, hasPermissions, members.update)
        .delete(auth.isMongoId, auth.requiresLogin, hasAuthorization, hasPermissions, members.destroy);

    // Finish with setting up the memberId param
    app.param('memberId', members.member);
};