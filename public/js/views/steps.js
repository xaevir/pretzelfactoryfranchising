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
        console.log('got to Steps link');
        scope.$on('LastElem', function(event){
          var prev = '<img class="prev" src="/img/arrow-backward.svg" />'
          var next = '<img class="next" src="/img/arrow-forward.svg" />'
          element.owlCarousel({nav: true, navText: [prev, next]});
          //$(element).children().css('border','5px solid blue');
        });
      }
    };
  })

  .directive('stepElement', function () {
    return {
      templateUrl: '/js/templates/steps/stepElement.html',
      require:'^steps',
      link: function(scope, element, attrs, stepListCtrl) {
        console.log('got to element link');
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
