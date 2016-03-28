'use strict';

/* jshint -W098 */
angular.module('mean.tickets').controller('TicketsController', ['$scope', 'Global', 'Tickets',
  function($scope, Global, Tickets) {
    $scope.global = Global;
    $scope.package = {
      name: 'tickets'
    };
  }
]);
