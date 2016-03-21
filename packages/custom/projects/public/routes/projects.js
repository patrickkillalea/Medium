'use strict';

//Setting up route
angular.module('mean.projects').config(['$stateProvider',
    function($stateProvider) {

        // states for my app
        $stateProvider
            .state('all projects', {
                url: '/projects',
                templateUrl: '/projects/views/list.html'
            })
            .state('create project', {
                url: '/projects/create',
                templateUrl: '/projects/views/create.html',
                requiredCircles: {
                    circles: ['can create content']
                }
            })
            .state('edit project', {
                url: '/projects/:projectId/edit',
                templateUrl: '/projects/views/edit.html',
                requiredCircles: {
                    circles: ['can edit content']
                }
            })
            .state('project by id', {
                url: '/projects/:projectId',
                templateUrl: '/projects/views/view.html'
            });
    }
]);