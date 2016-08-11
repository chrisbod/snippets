angular.module('shout', ['ionic']).controller('weather', function($scope,$http) {
	$scope.temperature = "-";
	$scope.icon = "";
	$scope.code = -1;
	$http({url:"http://api.apixu.com/v1/current.json?key=e99cdaedf71e447e8df93809163007&q=Liverpool"}).success(function (data) {
		$scope.temperature = data.current.temp_c
		//$scope.icon = data.current.condition.text.toLowerCase().replace(/\s*/g,'')+"_"+(data.current.is_day?  'day' : 'night')
		//$scope.code = data.current.condition.code
		$scope.icon = 'http:'+data.current.condition.icon;
		console.log(data)
	});
	$scope.post = function TEST() {
FB.login(function(){
	var message = "It's "+$scope.temperature+"\u00B0  in Liverpool"
  // Note: The call will only work if you accept the permission  
  	FB.api('/me/feed', 'post', {message: message});
}, {scope: 'publish_actions'});
}

})
