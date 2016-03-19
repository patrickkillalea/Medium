'use strict';

//Setting up route
angular.module('mean.members').config(['$stateProvider',
    function($stateProvider) {

        // states for my app
        $stateProvider
            .state('all members', {
                url: '/members',
                templateUrl: '/members/views/list.html'
            })
            .state('create member', {
                url: '/members/create',
                templateUrl: '/members/views/create.html',
                requiredCircles: {
                    circles: ['can create content']
                }
            })
            .state('edit member', {
                url: '/members/:memberId/edit',
                templateUrl: '/members/views/edit.html',
                requiredCircles: {
                    circles: ['can edit content']
                }
            })
            .state('member by id', {
                url: '/members/:memberId',
                templateUrl: '/members/views/view.html'
            });
    }
]);