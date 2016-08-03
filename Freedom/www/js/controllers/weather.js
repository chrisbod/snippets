angular.module('shout', ['ionic']).controller('weather', function($scope,$http) {
	$scope.temperature = "-";
	$scope.icon = "";
	$scope.code = -1;
	$http({url:"http://api.apixu.com/v1/current.json?key=e99cdaedf71e447e8df93809163007&q=Larnaca"}).success(function (data) {
		$scope.temperature = data.current.temp_c
		//$scope.icon = data.current.condition.text.toLowerCase().replace(/\s*/g,'')+"_"+(data.current.is_day?  'day' : 'night')
		//$scope.code = data.current.condition.code
		$scope.icon = 'http:'+data.current.condition.icon
	})

})
