'use strict';

angular.module('pretzelApp')
  .directive('parallax', function($window) {
    return {
      link: function($scope, $element) {
         	
        $($window).on('scroll', function(){
          var bgYPos = -($($window).scrollTop()) * 0.5;
          TweenLite.to($element, 0.1, {backgroundPosition: '50% ' + bgYPos + 'px'});      
        });

      }
    };
  })
  .directive('equalHeight', function($timeout) {
    return {
      link: function($scope, $element) {
        if ($scope.$last) {
          $timeout(function() { 
            $element.parent().find('.header').equalHeight({
              //responsive: true
            });         
          }, 0);

        }
      }
    };
  })
  .directive('slideInWaypoint', function() {
    return {
      scope: {
        waypointMarker: '@slideInWaypoint'
      },
      link: function($scope, $element) {

        $($scope.waypointMarker).waypoint(function(direction) {
          if (direction === 'down') {
            TweenLite.set($element, { position: 'fixed', top: -150, right: 0, left:0});
            TweenLite.to($element, 0.25, {top:0});
          }
          if (direction === 'up') {
            var complete = function (self) {
              TweenLite.set(self.target, { position: 'relative', top: 0});
            };
            TweenLite.to($element, 0.25, {top:-150, onComplete:complete, onCompleteParams:['{self}']});
          }
        });
      }
    };
  })
