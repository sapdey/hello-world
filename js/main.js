(function(){

	angular.module('myApp', ['ngMap'])
	.controller('newCon', function($scope, WeatherService, NgMap, $timeout) {
		var vm = this;
		
		vm.date = new Date();

		vm.search = "bangalore";

		vm.submit = function(){

			var promise1 = WeatherService.currentWeather(vm.search);
			var promise2 = WeatherService.getWeather(vm.search);
			
			  promise1.then(function(res){
					vm.current = res.data;
				})
				.catch(function(error){
					console.log("promise error");
				});

			  promise2.then(function(response){
					vm.value = response.data;
				})
				.catch(function(error){
					console.log("promise error");
				});
			};		
			
	 });

		angular.module('myApp').service('WeatherService', function($http){
			var service = this;

			service.currentWeather = function(search){
				var res = $http({
					method: "GET",
					url: "http://api.openweathermap.org/data/2.5/weather?q="+search+"&APPID=0bc7044a6bdf0ade7e698effcfdd0bb8"
				});

				return res;
			}

			service.getWeather = function(search){

				var response = $http({
					method: "GET",
					url: "http://api.openweathermap.org/data/2.5/forecast/daily?q="+search+"&cnt=10&APPID=0bc7044a6bdf0ade7e698effcfdd0bb8"
				});

				return response;
			};

		});

		angular.module('myApp').filter('celsius', function() {
			return function(input) {
				input = input - 273;
				return input;
			}
		});

		angular.module('myApp').filter('myDate', function() {
			return function(input){
				var d = new Date(input*1000);
				var months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
				var month = months[d.getMonth()];
  				var date = d.getDate();
  				var days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  				var day = days[d.getDay()];
  				var time = day + ", " + date+ " "+month;
  				return time;
			}
		});

		angular.module('myApp').filter('mainDate', function() {
			return function(input){
				var d = new Date();
				var months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
				var month = months[d.getMonth()];
  				var date = d.getDate();
  				var hour = d.getHours();
  				var minutes = d.getMinutes();
  				var time = month + " " + date + ", " + hour+":"+minutes;
  				return time;
			}
		});

})();