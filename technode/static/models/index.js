var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/technode');

var UserSchema = require('./user.js');

var User = mongoose.model('User', UserSchema);

exports.User = User;