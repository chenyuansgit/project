// 将socket.io封装成Angular服务
angular.module('technodeApp').factory('socket', function($rootScope){
    var socket = io.connect('http://localhost:3000');
    return {
        on: function(eventName, callback) {
            socket.on(eventName, function(){
                var args = arguments;
                $rootScope.$apply(function(){
                    callback.apply(socket, args);
                });
            })
        },
        emit: function(eventName, data, callback){
            socket.emit(eventName, data, function(){
                var args = arguments;
                $rootScope.$apply(function(){
                    callback.apply(socket, args);
                });
            });


        }

    };

});