import { Meteor } from 'meteor/meteor';
var Posts = new Meteor.Collection('posts');

Posts.allow({
    insert: function(userId, doc){
        return userId && (doc.user._id === userId);

    }
});

Meteor.startup(() => {
  // code to run on server at startup
});
