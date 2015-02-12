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
		if (!dbdays.length) {
			$.post("/day", function(data) {
			currentDay = new Day(data._id);
			currentDay.$button.addClass('current-day');
			});
			// $.post("/day");
			// currentDay = new Day();
			// currentDay.$button.addClass('current-day');
		}

		else {
			var dayOne;
			dbdays.forEach( function(dayToMake) {
				currentDay = new Day(dayToMake._id);
				currentDay.number = dayToMake.number;
				if (currentDay.number == 1) dayOne = currentDay;
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
			days.sort( function(day1,day2){
				return day1.number-day2.number;
			});
			dayOne.switchTo();
			currentDay = dayOne;
			currentDay.$button.addClass('current-day');
		}
	});
});

// for Each day in dbday -> make a new day, for each restaurant in the new day, make a new restaurant