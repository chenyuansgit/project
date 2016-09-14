var db = require('../models');
var async = require('async');
var gravatar = require('gravatar');

exports.findUserById = function(_userId, callabck){
    "use strict";
    db.User.findOne({
        _id: _userId
    }, callabck);
};

exports.findEmailOrCreate = function(email, callback){
    "use strict";
    db.User.findOne({
        email: email
    }, function(err, user){
        if(user){
            callback(null, user);
        } else {
            user = new db.User;
            user.name = email.split('@')[0];
            user.email = email;
            user.avatarUrl = gravatar.url(email);
            user.save(callback);
        }
    });
};