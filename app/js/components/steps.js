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
          element.owlCarousel({
            nav: true, 
            navText: [
              '<i class="sprite-arrow-left"></i>',
              '<i class="sprite-arrow-right"></i>'    
            ],
            responsiveClass:true,
            responsive:{
              0:{
                  items:1,
                  nav:true
              },
              768:{
                  items:3,
                  nav:true
              }
            }
         
          } ); 





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
