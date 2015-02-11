var dayRouter = require('express').Router();
var attractionRouter = require('express').Router();
var models = require('../models');

dayRouter.get('/', function (req, res, next) {
    // serves up all days as json
    models.Day.find({}, function(err,result) {
        res.json(result);
    });
    
    
});

dayRouter.post('/', function (req, res, next) {
    // creates a new day and serves it as json
    // models.Day.find().count( function (numDays) {
    //      console.log(numDays);
    // });
    
    models.Day.find().count( function (err, numDays) {
         var newDay = new models.Day( { number : numDays+1  } ) //change later
        newDay.save();
     });
    

});

dayRouter.get('/:id', function (req, res, next) {
    var id = req.params.id;
    models.Day.findOne( { _id : id } , function(day) {
        res.json(day);
    });
});

dayRouter.delete('/:id', function (req, res, next) {
   var id = req.params.id;
   models.Day.remove( {_id : id});
});

dayRouter.use('/:id', attractionRouter);

// POST /days/:id/hotel
attractionRouter.post('/hotel', function (req, res, next) {
    var hotelID = req.body.hotel._id;
    var id = req.params.id;
    models.Day.findOne( {_id : id} , function(err, day) {
        day.hotel = hotelId;
    });
});

// DELETE /days/:id/hotel
attractionRouter.delete('/hotel', function (req, res, next) {
    var id = req.params.id;
    models.Day.findOne( {_id : id} , function( err, day ) {
        day.hotel = undefined;
    });

});
// POST /days/:id/restaurants
attractionRouter.post('/restaurants', function (req, res, next) {
    // creates a reference to a restaurant
    var restID = req.body.restaurant._id;
    var id = req.params.id;
    models.Day.findOne( {_id : id} , function(err, day) {
        day.restaurants.push(restID);
    });
});
// DELETE /days/:dayId/restaurants/:restId
attractionRouter.delete('/restaurant/:id', function (req, res, next) {
    var id = req.params.id;
    models.Day.findOne( {_id : id} , function( err, day ) {
        var restaurantID = req.body.restaurant._id;
        var index = day.restaurants.indexOf(restaurantID);
        day.restaurants.splice(index,1);
    });
});
// POST /days/:id/thingsToDo
attractionRouter.post('/thingsToDo', function (req, res, next) {
    // creates a reference to a thing to do
    var thingID = req.body.thing._id;
    var id = req.params.id;
    models.Day.findOne( {_id : id} , function(err, day) {
        day.thingsToDo.push(thingID);
    });

});
// DELETE /days/:dayId/thingsToDo/:thingId
attractionRouter.delete('/thingsToDo/:id', function (req, res, next) {
    // deletes a reference to a thing to do
    var id = req.params.id;
    models.Day.findOne( {_id : id} , function( err, day ) {
        var thingID = req.body.thing._id;
        var index = day.thingsToDo.indexOf(thingID);
        day.thingsToDo.splice(index,1);
    });
});

module.exports = dayRouter;