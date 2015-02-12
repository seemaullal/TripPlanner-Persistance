var dayRouter = require('express').Router();
var attractionRouter = require('express').Router();
var models = require('../models');

dayRouter.get('/', function (req, res, next) {
    // serves up all days as json
    models.Day.find().sort({number:1}).populate('hotel restaurants thingsToDo').exec( function(err,result) {
        console.log(result);
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
        newDay.save(function( err, dayObj) {
            res.json(dayObj);
        });
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
   models.Day.remove( {number : id});
   res.send();
});

dayRouter.use('/:id', function(req,res,next){
    console.log("REQ",req.params);
    req.id=req.params.id;
    next();
});

dayRouter.use('/:id', attractionRouter);

// POST /day/:id/hotel
attractionRouter.post('/hotel', function (req, res, next) {
    var id = req.id;
    models.Day.findOne( {number : id} , function(err, day) {
        day.hotel = req.body._id;
        day.save();
        // day.populate('hotel', function(err, popDay) {
        //     console.log("check");
        // });
        res.send();
    });

});

// DELETE /days/:id/hotel
attractionRouter.delete('/hotel', function (req, res, next) {
    var id = req.id;
    models.Day.findOne( {number : id} , function( err, day ) {
        day.hotel = undefined;
        day.save();
        res.send();
    });

});
// POST /days/:id/restaurants
attractionRouter.post('/restaurants', function (req, res, next) {
    // creates a reference to a restaurant
    var id = req.id;
    models.Day.findOne( {number : id} , function(err, day) {
        day.restaurants.push(req.body._id);
        day.save();
        res.send();
    });
});
// DELETE /days/:dayId/restaurants/:restId
attractionRouter.delete('/restaurants/:id', function (req, res, next) {
    var id = req.id;
    models.Day.findOne( {number : id} , function( err, day ) {
        var index = day.restaurants.indexOf(req.body._id);
        day.restaurants.splice(index,1);
        day.save();
         res.send();
    });
});
// POST /days/:id/thingsToDo
attractionRouter.post('/thingsToDo', function (req, res, next) {
    // creates a reference to a thing to do
    var id = req.id;
    models.Day.findOne( {number : id} , function(err, day) {
        day.thingsToDo.push(req.body._id);
        day.save();
         res.send();
    });

});
// DELETE /days/:dayId/thingsToDo/:thingId
attractionRouter.delete('/thingsToDo/:id', function (req, res, next) {
    // deletes a reference to a thing to do
    var id = req.id;
    models.Day.findOne( {number : id} , function( err, day ) {
        var index = day.thingsToDo.indexOf(req.body._id);
        day.thingsToDo.splice(index,1);
        day.save();
        res.send();
    });
});

module.exports = dayRouter;