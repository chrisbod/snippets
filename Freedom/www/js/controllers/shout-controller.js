shout.controller(
  'shout-controller', 
function($scope,$http,$state) {
  $scope.categories = [];
  $scope.title = "";
  var lastCategory = null;
  var rootCategory;
  $scope.currentCategory = null


  $http({
    url: "json/categories-shout.json"
  }).success(
  function (data) {
    rootCategory = data
    $scope.title = data.name
    $scope.categories = data.children;
  }

  )

  $scope.selectCategory = function (category,force) {
    if (!force&&category.children&&category.children.length) {
      $scope.title = category.name;
      $scope.categories = category.children
      lastCategory = $scope.currentCategory;
      $scope.currentCategory = category;
      if (category == rootCategory) {
        $scope.currentCategory = lastCategory = null;
      }
    } else {
      $state.go('shoutit',category)
    }
  }
  $scope.backCategory = function () {
    $scope.selectCategory(lastCategory||rootCategory)
  }
});