// 滚动条自动滚到底部
angular.module('technodeApp').directive('autoScrollToBottom', function(){
    "use strict";
    return {
        link : function(scope, element, attrs){
            scope.$watch(function(){
                    return element.children().length;
                },
                function(){
                    element.animate({
                        scrollTop: element.prop('scrollHeight')
                    }, 1000);
                });
        }
    }
});