function eachKeyValue (obj, onEach) {
	Object.keys(obj).forEach(function (key) {
		onEach(key, obj[key])
	});
}

var days, currentDay;

$(document).ready(function () {
	days = [];
	// currentDay = new Day();
	// currentDay.$button.addClass('current-day');
	$.get('/day', function(dbdays) {
		if (dbdays.length < 1) {
			$.post("/day");
			currentDay = new Day();
			currentDay.$button.addClass('current-day');
		}

		else {
			var dayOne;
			dbdays.forEach( function(dayToMake) {
				currentDay = new Day(dayToMake._id);
				if (dayToMake.number == 1) dayOne = currentDay;
				if (dayToMake.hotel) {
					new Hotel(dayToMake.hotel);
				}

				dayToMake.restaurants.forEach(function (rest) {
					new Restaurant(rest);
				});

				dayToMake.thingsToDo.forEach(function(thing) {
					new ThingToDo(thing);
				});

				dayOne.switchTo();
			
			});
			currentDay = dayOne;
			currentDay.$button.addClass('current-day');
		}
	});
});

// for Each day in dbday -> make a new day, for each restaurant in the new day, make a new restaurant