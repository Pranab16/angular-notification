// this service will interact with analytics library
NOTIFICATION.factory('NotificationService', function(){
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
});
