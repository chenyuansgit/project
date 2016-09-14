// 定义路由
angular.module('technodeApp').config(function($routerProvider, $locationProvider){
    $locationProvider.html5Mode(true);
    
    $routerProvider.when('/', {
        templateUrl: '/pages/room.html',
        controller: 'RoomCtrl'
    }).when('/login', {
        templateUrl: '/pages/login.html',
        controller: 'LoginCtrl'
    }).otherwise({
        redirectTo: '/login'
    });
});