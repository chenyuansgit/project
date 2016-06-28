import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';
//import { Session } from 'meteor/session'

import './main.html';

// 创建posts集合
var Posts = new Meteor.Collection('posts');

// 添加session保存页面状态:要显示的子页面
Session.setDefault("currentUrl", {index:'active', login:'', reg:''});
// session 保存flash信息
Session.setDefault("info", {success:'', error:''});

Template.container.helpers({
    currentUrl :function(){
        console.log('currentUrl get session', Session.get("currentUrl"));
        return Session.get("currentUrl");
    }
});

Template.info.helpers({
    info :function(){
        console.log('info get session');
        return Session.get("info");
    }
});


// 导航按钮高亮
Template.nav.helpers({
    active: function(){
        console.log('active get session');
        return Session.get("currentUrl");
    }
});

// 显示所有发表
Template.index.helpers({
    posts : function(){
        return Posts.find({}, {sort: {time:-1}});
    }
});

// 注册事件
Template.reg.events({
    'click #submit': function(evt){
        evt.preventDefault();
        var username = $("#username").val();
        var password = $("#password").val();
        var password_repeat = $("#password-repeat").val();

        if(username.length == 0 || password.length == 0){
            Session.set('info', {success:'', error:'用户名和密码不能为空'});
            return;
        }
        if(password !== password_repeat){
            Session.set('info', {success:'', error:'两次输入密码不一致'});
            return;
        }

        Accounts.createUser({
            username: username,
            password: password
        }, function(err){
            if(err){
                Session.set('info', {success:'', error:err.reason});
            } else {
                // 跳转到主页
                console.log('注册成功');
                Session.set('info', {success:'注册成功', error:''});
                FlowRouter.go('index');

            }

        });
    }
});
// 登录事件
Template.login.events({
    'click #submit': function(evt){
        evt.preventDefault();
        var username = $("#username").val();
        var password = $("#password").val();

        if(username.length == 0 || password.length == 0){
            Session.set('info', {success:'', error:'用户名和密码不能为空'});
            return;
        }
        Meteor.loginWithPassword(username, password, function(err){
            if(err){
                Session.set('info', {success:'', error:err.reason});
            } else {
                Session.set('info', {success:'登录成功', error:''});
                FlowRouter.go('index');
            }
        });
    }
});
// 发表事件
Template.index.events({
    'click #submit': function(evt){
        evt.preventDefault();
        var post = $('#post').val();
        if(post.length == 0 || post.length >= 140){
            Session.set('info', {success:'', error:'请将字数限制在1-140字'});
            return;
        }
        // 保存到数据库中
        Posts.insert({user:Meteor.user(), post:post, time: new Date()}, function(err){
            if(err) {
                Session.set('info', {success:'', error:err.reason});
            } else {
                Session.set('info', {success:'发表成功', error:''});
                $('#post').val('');
            }
        });

    }
});

FlowRouter.route('/', {
    name: 'index',
    action: function(params) {
        Session.set("currentUrl", {index:'active', login:'', reg:''});
    }
});
FlowRouter.route('/login', {
    name: 'login',
    action: function(params) {
       if(Meteor.userId()){
           Session.set('info', {success:'', error:'用户已在线'});
           FlowRouter.go('index');
           return;
       }

        Session.set("currentUrl", {index:'', login:'active', reg:''});
    }
});
FlowRouter.route('/reg', {
    name: 'reg',
    action: function(params) {
        if(Meteor.userId()){
            Session.set('info', {success:'', error:'用户已在线'});
            FlowRouter.go('index');
            return;
        }
        Session.set("currentUrl", {index:'', login:'', reg:'active'});
    }
});

FlowRouter.route('/logout', {
    name: 'logout',
    action: function(params) {
        if(Meteor.userId()){
            // 用户退出登录
            Meteor.logout();
            Session.set('info', {success:'登出成功', error:''});
            FlowRouter.go('index');
            return;
        }
        Session.set('info', {success:'', error:'用户不在线'});
        FlowRouter.go('index');
    }
});