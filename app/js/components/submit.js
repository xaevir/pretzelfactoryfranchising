// define custom submit directive
'use strict';
angular.module('rcForm', [])
  .directive('rcSubmit', ['$parse', function ($parse) {
    return {
      restrict: 'A',
      require: ['rcSubmit', '?form'],
      controller: ['$scope', function ($scope) {
        this.submitted = false;
        var formController = null;

        this.setSubmitted = function() {
            this.submitted = true;
        };

        this.reset = function() {
            this.submitted = false;
        };

        this.setFormController = function(controller) {
          formController = controller;
        };

        this.isInvalid = function (field) {
          return field.$invalid && (field.$dirty || this.submitted);
        };

        this.isValid = function (field) {
          return field.$valid && field.$dirty;
        };

        this.classStatus = function(controlName) {
          var field = formController[controlName];
          if(this.isValid(field))
            return 'has-success';
          if(this.isInvalid(field))
            return 'has-error';
        };
        this.interactedWith = function(controlName) {
          return this.submitted || formController[controlName].$dirty;
        };

      }],
      compile: function(cElement, cAttributes, transclude) {
        return {
          pre: function(scope, formElement, attributes, controllers) {

            var submitController = controllers[0];
            var formController = (controllers.length > 1) ? controllers[1] : null;

            submitController.setFormController(formController);
            scope.form = submitController;
          },
          post: function(scope, formElement, attributes, controllers) {

            var submitController = controllers[0];
            var formController = (controllers.length > 1) ? controllers[1] : null;
            var fn = $parse(attributes.rcSubmit);

            formElement.bind('submit', function (event) {
              submitController.setSubmitted();
                if (!scope.$$phase) scope.$apply();

                if (!formController.$valid) return false;

                scope.$apply(function() {
                  fn(scope, {$event:event});
                });
            });
          }
        };
      }
    };
    }]);
