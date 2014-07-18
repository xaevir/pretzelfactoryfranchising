'use strict';

angular.module('pretzelApp')
  .directive('downArrows', function() {
    return {
      link: function(scope, element) {

        var s = Snap('#arrows'),
          a1 = s.select('#a1'),
          a2 = s.select('#a2'),
          a3 = s.select('#a3');

        TweenMax.to(a1.node, 1, {opacity:0, repeat:-1, yoyo:true});
        TweenMax.to(a2.node, 1, {opacity:0, repeat:-1, yoyo:true, delay: 0.5});
        TweenMax.to(a3.node, 1, {opacity:0, repeat:-1, yoyo:true, delay: 1});
      }
    };
  })

