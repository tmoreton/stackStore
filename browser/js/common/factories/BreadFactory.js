'use strict';
app.factory('BreadFactory', function () {
  var bread = [
    'Wheat',
    'White',
    'Rye',
    'Brioche',
    'Baguette',
    'Lettuce Wrap',
    'Pumpernickel',
    'Ciabatta',
    'Multigrain',
    'Pretzel Roll'
  ];

  return {
    bread : bread
  };

});