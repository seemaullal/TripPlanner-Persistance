var Hotel;

$(document).ready(function () {

	$.get('/hotels', function (data) {
		Hotel.prototype = generateAttraction({
			icon: '/images/lodging_0star.png',
			$listGroup: $('#my-hotel .list-group'),
			$all: $('#all-hotels'),
			all: data,
			constructor: Hotel,
			addToDay: function(attraction) {
				$.post('/day/' + currentDay.number + '/hotel', attraction);
			}
		});
		// remove a hotel from the current day
		Hotel.prototype.delete = function () {
			currentDay.hotel
				.eraseMarker()
				.eraseItineraryItem();
			currentDay.hotel = null;
			$.ajax({
				url: '/day/' + currentDay.number + '/hotel',
				type: 'DELETE'
			});
		};

	});
	// construct a new hotel for the current day
	Hotel = function (data) {
		// console.log('/day/' + currentDay.number + '/hotel');
		// $.post('/day/' + currentDay.number + '/hotel', { hotel: data }, function(data){
		// 	console.log(data);
		// });
		var self = this;
		eachKeyValue(data, function (key, val) {
			self[key] = val;
		});
		if (currentDay.hotel) {
			currentDay.hotel.delete();
		}
		this.buildMarker()
			.drawMarker()
			.buildItineraryItem()
			.drawItineraryItem();
		currentDay.hotel = this;
	}	
});