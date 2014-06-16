'use strict';

angular.module('pretzelApp', ['pretzelApp.Steps'])
  .controller('pretzelCtrl', function ($scope, $http) {

    $scope.pageElements = [];

    $http.get('/js/data.json')
      .success(function (data) {
        $scope.pageElements = data;
      })
      .error(function (error) {
        $scope.error = error;
      });

  });


