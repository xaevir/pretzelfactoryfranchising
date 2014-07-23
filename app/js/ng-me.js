'use strict';

angular.module('pretzelApp', ['pretzelApp.Steps', 'ngMessages', 'mgcrea.ngStrap', 'rcForm', 'ngSanitize'])
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
  .controller('requestFormCtrl', function ($scope, $http, $alert) {
     
    $scope.data = {country: 1};

    $scope.resetData = function() {
      $scope.data = {country: 1};
    }

    $scope.sendData = function (data) {
      $http.post('/request-info', data)
        .success(function (res) {
          $alert({
            content: '<p class="lg"><b>Thank you for your interest!</b></p> <p class="md"> We have received your request and will get back to you shortly.</p>',
            placement: 'top',
            type: 'info',
            container: 'body'
          });
          $scope.requestForm.$setPristine();
          $scope.resetData();
          $scope.form.reset();
        })
      .error(function (error) {
        $alert({
          content: 'There was an error. Please try again.',
          placement: 'top',
          type: 'danger',
          duration: 3,
        });

      });
    };


  });


