NOTIFICATION
    .controller('notificationController',['$scope', 'NotificationService',
        function($scope, NotificationService) {
            "use strict";

            $scope.notifications = NotificationService.notifications;
            $scope.removeNotification = function(index){
                NotificationService.removeNotification(index);
            };
    }])
    .directive('notification', function() {
    "use strict";
    return {
        restrict: 'A',
        controller: 'notificationController',
        template: '<div id="toast-container">' +
            '<div ng-class="notification.positionClass" ng-repeat="notification in notifications track by $index">' +
            '<div class="toast toast-{{notification.type}}" ng-animate>' +
                '<button ng-if="notification.closeButton" class="toast-close-button" ng-click="removeNotification($index)">×</button>' +
                '<div ng-if="notification.title" class="toast-title" compile-html="notification.title"></div>' +
                '<div class="toast-message" compile-html="notification.message"></div>' +
            '</div>' +
            '</div>' +
            '</div>'
    };
});
