angular.module('shout', ['ionic']).controller(
	'categories', 
function($scope,$http) {
	$scope.categories = [];
	$scope.title = "";
	var lastCategory = null;
	var rootCategory;
	$scope.currentCategory = null


	$http({
		url: "json/categories.json"
	}).success(
	function (data) {
		rootCategory = data
		$scope.title = data.name
		$scope.categories = data.children;
	}

	)

	$scope.selectCategory = function (category) {
		if (category.children&&category.children.length) {
			$scope.title = category.name;
			$scope.categories = category.children
			lastCategory = $scope.currentCategory;
			$scope.currentCategory = category;
			if (category == rootCategory) {
				$scope.currentCategory = lastCategory = null;
			}
		}
	}
	$scope.backCategory = function () {
		$scope.selectCategory(lastCategory||rootCategory)
	}
});
