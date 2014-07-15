'use strict';

angular.module('pretzelApp', ['pretzelApp.Steps', 'ngMessages', 'mgcrea.ngStrap', 'rcForm'])
  .controller('pretzelCtrl', function ($scope, $http) {

    $scope.pageElements = [];

    $http.get('/js/data.json')
      .success(function (data) {
        $scope.pageElements = data;
      })
      .error(function (error) {
        $scope.error = error;
      });
  })
  .controller('requestFormCtrl', function ($scope, $http, $alert) {

    $scope.hasError = function(name) {
      var control = $scope.requestForm[name];
      if (control.$invalid && control.$dirty) {
        return 'has-error';
      }
      if(control.$valid && control.$dirty) {
        return 'has-success';
      }
    };

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
          $scope.data = {};
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


