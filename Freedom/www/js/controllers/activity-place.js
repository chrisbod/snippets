angular.module('shout', ['ionic','ion-gallery']).controller(
	'activity-place', 
function($scope,$http) {

	$scope.summary = null;
	$scope.loading = false;
	$scope.view = "home";
	$scope.shouts = null;
	$scope.pictures = null;
	$scope.videos = null;
	$scope.thumbnails = null;
	$scope.title = ""
	
	$scope.getRatingClass = function(rating) {
		console.log(rating)
		switch (rating) {
			case -1: return 'ion-android-star-outline dark';
			case 0: return 'ion-thumbsdown';
			case 1: return 'ion-android-star-outline';
			case 5: return 'ion-android-star energized';
			case 3: return 'ion-android-star-half energized';
			case 4: return 'ion-android-star energized';
			case 2: return 'ion-android-star-half energized';

		}

	}	

	$scope.updateTitle = function () {
		 $scope.title = $scope.view == "activities" ? "Activities" : ($scope.summary ? $scope.summary.activity : '');
	}
	
	$scope.showHome = function () {
		$http({url:"json/cliffjumping.json"}).success(function (data) {
		$scope.summary = data;
		$scope.updateTitle()
		
	})
	}

 $scope.launchVideo = function (item) {
 	alert(item.name)
 }
	$scope.showShouts = function () {
		$scope.loading = true;

		$http({url:"json/cliffjumping-shouts.json"})
		.success(function (data) {
			$scope.loading=false;
			$scope.view = "shouts";
			data.forEach(function (shout) {
				shout.ago = moment(shout.date).fromNow();

			})
			$scope.shouts = data;
			$scope.updateTitle();
		});
	}
	$scope.showPictures = function () {
		$scope.loading = true
		$http({url:"json/cliffjumping-pictures.json"})
		.success(function (thumbnails) {
			$scope.loading=false;
			$scope.view = "pictures";
			$scope.thumbnails = thumbnails;
			$scope.updateTitle();
		});
	}
	$scope.showActivities = function () {
		$scope.loading = true;
		$http({url:"json/malamasbeach-activities.json"})
		.success(function (activities) {
			$scope.loading=false;
			$scope.view = "activities";
			$scope.activities = activities;
			$scope.updateTitle();
		});
	}
	$scope.showVideos = function () {
		$scope.loading = true;
		$http({url:"json/cliffjumping-videos.json"})
		.success(function (videos) {
			$scope.loading=false;
			$scope.view = "videos";
			$scope.videos = videos;
			$scope.updateTitle();
		});
	}


	$scope.showHome()
});
