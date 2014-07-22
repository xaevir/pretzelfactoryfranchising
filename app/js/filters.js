'use strict';

angular.module('pretzelApp')
  .filter('group', function() {
      return function(items, groupItems) {
          if (items) {
              var newArray = [];

              for (var i = 0; i < items.length; i+=groupItems) {
                  if (i + groupItems > items.length) {
                      newArray.push(items.slice(i));
                  } else {
                      newArray.push(items.slice(i, i + groupItems));
                  }
              }

              return newArray;
          }
      };
  })

