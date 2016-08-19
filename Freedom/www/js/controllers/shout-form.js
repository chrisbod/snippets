

angular.module('shout', ['ionic']).controller('shout-form', function($scope,$http) {
	$scope.files = [];
	$scope.addFile = function (fileObject) {
		var file = {
			fileObject: fileObject,
			format: fileObject.type.replace(/\/.*$/,''),
			extension: fileObject.name.match(/(?:\.)(\w+)$/)[1]
		}
		if (file.format=="image") {
			var reader  = new FileReader();

  reader.addEventListener("load", function () {
    file.dataURL = reader.result;
    $scope.$apply()
  }, false);

  if (file) {
    reader.readAsDataURL(fileObject);
  }
		} else if (file.format == "audio") {
			if (file.extension=="mp3") {
				id3(fileObject, function (det,obj) {
					if (obj) {
						file.artist = obj.artist;
						file.title = obj.title;
						$scope.$apply()
					}
				})
			}
		}

		$scope.files.push(file);
	}
	

	

}).directive('bindFile', [function () {
    return {
        require: "ngModel",
        restrict: 'A',
        link: function ($scope, el, attrs, ngModel) {
            el.bind('change', function (event) {
                ngModel.$setViewValue(event.target.files[0]);
                $scope.addFile(event.target.files[0]);
            });

            $scope.$watch(function () {
                return ngModel.$viewValue;
            }, function (value) {
                if (!value) {
                    el.val("");
                }
            });
        }
    };
}]);
