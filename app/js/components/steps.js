'use strict';

angular.module('pretzelApp.Steps', ['ui.bootstrap.collapse'])

  .controller('StepsController', ['$scope', '$attrs', function ($scope, $attrs) {

    this.elements = [];

    this.closeOthers = function(openElement) {
      angular.forEach(this.elements, function (element) {
        if ( element !== openElement ) {
          element.isOpen = false;
        }
      });
    };

    this.addElement = function(elementScope) {
      this.elements.push(elementScope);
    };

  }])

  .directive('steps', function () {
    return {
      controller: 'StepsController',
      templateUrl: '/js/templates/steps/steps.html',
      replace : true,
      scope: {
        'elements': '=steps'
      },
      link : function (scope, element) {
        scope.$on('LastElem', function(event){
          var compiled = _.template('<svg  class="<%= classname %>" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" enable-background="new 0 0 100 100" height="100" id="Layer_1" version="1.1" viewBox="0 0 100 100" width="100" xml:space="preserve">'+
                                      '<path d="M29.56 97.14C28.98 97.71 28.23 98 27.48 98s-1.51-0.29-2.08-0.86c-1.15-1.15-1.15-3.02 0-4.17L68.36 50 25.39 7.03c-1.15-1.15-1.15-3.01 0-4.17 1.15-1.15 3.02-1.15 4.17 0L74.61 47.92c1.15 1.15 1.15 3.02 0 4.17L29.56 97.14z"/>'+
                                    '</svg>');
          element.owlCarousel({nav: true, navText: [
            compiled({'classname': 'prev'}), 
            compiled({'classname': 'next'})
          ]});
        });
      }
    };
  })

  .directive('stepElement', function () {
    return {
      templateUrl: '/js/templates/steps/stepElement.html',
      require:'^steps',
      link: function(scope, element, attrs, stepListCtrl) {
        stepListCtrl.addElement(scope);

        if (scope.$last){
          scope.$emit('LastElem');
        }

        scope.$watch('isOpen', function(value) {
          if ( value ) {
            stepListCtrl.closeOthers(scope);
          }
        });

        scope.toggleOpen = function() {
          scope.isOpen = !scope.isOpen;
        };
      }
    };
  });
