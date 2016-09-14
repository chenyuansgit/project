// 定义RoomCtrl
angular.module('technodeApp').controller('RoomCtrl', function($scope, socket){
    "use strict";
    $scope.messages = [];
    socket.emit('getAllMessages');

    socket.on('allMessages', function(messages){
        console.log('messages1:',$scope.messages);
        $scope.messages = messages;
    });
    socket.on('messageAdded', function(message){
        $scope.messages.push(message);
        console.log('messages2:',message, $scope.messages);
    });
});