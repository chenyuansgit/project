// 定义MessageCreatorCtrl
angular.module('technodeApp').controller('MessageCreatorCtrl', function($scope, socket){
    "use strict";
    $scope.newMessage = '';
    $scope.createMessage = function(){
        if($scope.newMessage == ''){
            return ;
        }
        socket.emit('createMessage', $scope.newMessage);
        $scope.newMessage = '';
    }
});
