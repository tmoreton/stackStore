
'use strict';
app.factory('BreadFillings', function () {

    var bread = [
        'Wheat',
        'White',
        'Rye',
        'Brioche',
        'Baguette',
        'Wrap',
        'Pumpernickel',
        'Ciabatta',
        'Multigrain',
        'Pretzel Roll'
    ];

    var fillings = [
       'Turkey',
       'Ham',
       'Roast Beef',
       'Chicken',
       'Salami',
       'Bacon',
       'Lettuce',
       'Tomato',
       'Avocado',
       'Onions',
       'Bell Peppers',
       'Spinach',
       'Portobello Mushroom',
       'Kale',
       'Hummus',
       'Peanut Butter',
       'Jelly',
       'Mayonnaise',
       'Mustard',
       'Cheddar',
       'Provolone',
       'Brie',
       'Pepper Jack',
       'Swiss',
       'Goat Cheese',
       'Bananas',
       'Potato Chips',
       'Apples',
   ];

    return {
        bread : bread,
        fillings : fillings
        
    };

});