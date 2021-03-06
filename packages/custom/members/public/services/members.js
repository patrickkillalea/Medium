'use strict';

//Members service used for members REST endpoint
angular.module('mean.members').factory('Members', ['$resource',
    function($resource) {
        return $resource('api/members/:memberId', {
            memberId: '@_id'
        }, {
            update: {
                method: 'PUT'
            }
        });
    }
]);