(function() {
    'use strict';

    angular.module('angularNotification', [])
        .controller('notificationController',['$scope', 'NotificationService',
            function($scope, NotificationService) {
                $scope.notifications = NotificationService.notifications;
                $scope.removeNotification = function(index){
                    NotificationService.removeNotification(index);
                };
            }])
        .directive('notification', function() {
            return {
                restrict: 'A',
                controller: 'notificationController',
                template: '<div id="notification-container">' +
                    '<div ng-class="notification.positionClass" ng-repeat="notification in notifications track by $index">' +
                    '<div class="toast toast-{{notification.type}}" ng-animate>' +
                    '<button ng-if="notification.closeButton" class="toast-close-button" ng-click="removeNotification($index)">×</button>' +
                    '<div ng-if="notification.title" class="toast-title" compile-html="notification.title"></div>' +
                    '<div class="toast-message" compile-html="notification.message"></div>' +
                    '</div>' +
                    '</div>' +
                    '</div>'
            };
        })
        .factory('NotificationService', function(){
            "use strict";
            var notificationService = {};

            notificationService.notifications = [];
            notificationService.options = {
                closeButton: false,
                preventDuplicates: false,
                positionClass: 'toast-top-right',
                newestOnTop: false,
                type: 'success'
            };

            notificationService.getNotifications = function(){
                return notificationService.notifications;
            };

            notificationService.addNotification = function(message, options){
                options = angular.extend({}, notificationService.options, options);
                options.message = message;

                if(options.preventDuplicates && notificationService.isDuplicate(options)){
                    return;
                }

                if(options.newestOnTop){
                    notificationService.notifications.unshift(options);
                } else {
                    notificationService.notifications.push(options);
                }
            };

            notificationService.isDuplicate = function(options){
                for(var i=0; i<notificationService.notifications.length; i++){
                    if(notificationService.notifications[i].message === options.message ||
                        (notificationService.notifications[i].notificationId !== undefined && notificationService.notifications[i].notificationId === options.notificationId)){
                        return true;
                    }
                }
                return false;
            };

            notificationService.removeNotificationfromIndex = function(index){
                notificationService.notifications.splice(index, 1);
            };

            notificationService.removeLastNotification = function(){
                notificationService.removeNotificationfromIndex(notificationService.notifications.length - 1);
            };

            notificationService.removeNotification = function(notificationId){
                for(var i=0; i<notificationService.notifications.length; i++){
                    console.log(notificationService.notifications[i].notificationId);
                    console.log(notificationService.notifications[i].notificationId === notificationId);
                    if(notificationService.notifications[i].notificationId === notificationId){
                        notificationService.removeNotificationfromIndex(i);
                    }
                }
            };

            notificationService.updateNotification = function(notificationId, options){
                for(var i=0; i<notificationService.notifications.length; i++){
                    if(notificationService.notifications[i].notificationId === notificationId){
                        notificationService.notifications[i] = options;
                    }
                }
            };

            return notificationService;
        })
        .directive("compileHtml", function($parse, $sce, $compile) {
            return {
                restrict: "A",
                link: function (scope, element, attrs) {
                    scope.$watch(
                        function(scope) {
                            // watch the 'compile' expression for changes
                            return scope.$eval(attrs.compileHtml);
                        },
                        function(value) {
                            // when the 'compile' expression changes
                            // assign it into the current DOM
                            element.html(value);

                            // compile the new DOM and link it to the current
                            // scope.
                            // NOTE: we only compile .childNodes so that
                            // we don't get into infinite loop compiling ourselves
                            $compile(element.contents())(scope);
                        }
                    );
                }
            };
        });
})();

