'use strict';

angular.module('mean.projects').controller('ProjectsController', ['$scope', '$stateParams', '$location', 'Global', 'Projects', 'MeanUser', 'Circles',
    function($scope, $stateParams, $location, Global, Projects, MeanUser, Circles) {
        $scope.global = Global;

        $scope.hasAuthorization = function(project) {
            if (!project || !project.user) return false;
            return MeanUser.isAdmin || project.user._id === MeanUser.user._id;
        };

        $scope.availableCircles = [];

        Circles.mine(function(acl) {
            $scope.availableCircles = acl.allowed;
            $scope.allDescendants = acl.descendants;
        });

        $scope.showDescendants = function(permission) {
            var temp = $('.ui-select-container .btn-primary').text().split(' ');
            temp.shift(); //remove close icon
            var selected = temp.join(' ');
            $scope.descendants = $scope.allDescendants[selected];
        };

        $scope.selectPermission = function() {
            $scope.descendants = [];
        };

        $scope.create = function(isValid) {
            if (isValid) {
                // $scope.project.permissions.push('test test');
                var project = new Projects($scope.project);

                project.$save(function(response) {
                    $location.path('projects/' + response._id);
                });

                $scope.project = {}; 

            } else {
                 $scope.submitted = true;
            }
        };

        $scope.remove = function(project) {
            if (project) {
                project.$remove(function(response) {
                    for (var i in $scope.projects) {
                        if ($scope.projects[i] === project) {
                            $scope.projects.splice(i, 1);
                        }
                    }
                    $location.path('projects');
                });
            } else {
                $scope.project.$remove(function(response) {
                    $location.path('projects');
                });
            }
        };

        $scope.update = function(isValid) {
            if (isValid) {
                var project = $scope.project;
                if (!project.updated) {
                    project.updated = [];
                }
                project.updated.push(new Date().getTime());

                project.$update(function() {
                    $location.path('projects/' + project._id);
                });
            } else {
                $scope.submitted = true;
            }
        };

        $scope.find = function() {
            Projects.query(function(projects) {
                $scope.projects = projects;
            });
        };

        $scope.findOne = function() {
            Projects.get({
                projectId: $stateParams.projectId
            }, function(project) {
                $scope.project = project;
            });
        };
    }
]);