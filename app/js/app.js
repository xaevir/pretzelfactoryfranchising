'use strict';

angular.module('pretzelApp', ['pretzelApp.Steps', 'ngNotify', 'rcForm', 'ngSanitize', 'ngFitText', 'ui.mask'])
  .controller('pretzelCtrl', function ($scope, $http, $filter) {

    $scope.pageElements = [];

    $http.get('/js/data.json')
      .success(function (data) {
        $scope.pageElements = data;
        $scope.pageElements.supportGroups = $filter('group')(data.support, 4);
        $scope.pageElements.moreSupportGroups = $filter('group')(data.moreSupport, 4);
      })
      .error(function (error) {
        $scope.error = error;
      });
  })
  .controller('requestFormCtrl', function ($scope, $http, ngNotify) {
    
    $scope.data = {country: 'US'};

    $scope.resetData = function() {
      $scope.data = {country: 'US'};
    };

    $scope.sendData = function (data) {
      $http.post('/request-info', data)
        .success(function (res) {
          ngNotify.set('Thank you for your interest! We have received your request and will get back to you shortly.', {
              position: 'top',
          });
          $scope.requestForm.$setPristine();
          $scope.resetData();
          $scope.form.reset();
        })
      .error(function (error) {
         ngNotify.set('There was an error. Please try again.', 'error');
      });
    };


  });


