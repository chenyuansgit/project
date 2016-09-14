
// 定义technodeApp模块:添加路由支持+程序执行时第一个启动的块
angular.module('technodeApp', ['ngRoute']).run(function($window, $rootScope, $http, $location){
    "use strict";
    $http({
        url: '/api/validate',
        method:'GET'
    }).success(function(user){
        console.log('room page...',user);
        $rootScope.me = user;
        $location.path('/');
    }).error(function(data){
        console.log('login page...');
        $location.path('/login');
    });
});









