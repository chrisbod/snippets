angular.module('shout', ['ionic']).controller('location', function($scope,$http,$ionicScrollDelegate) {
    $scope.displayMode = "continents";
    $scope.countries = [];
    var map = new GMaps({
  div: '#gmap',
    lat: -12.043333,
  lng: -77.028333
});

    var maphelper = new GMapsHelper()
GMaps.geolocate({
  success: function(position) {
    map.setCenter(position.coords.latitude, position.coords.longitude);
    map.addMarker({
  lat: position.coords.latitude,
  lng: position.coords.longitude,
  click: function () {
    map.setZoom(10)
    map.setCenter(position.coords.latitude, position.coords.longitude);
  }
});
    maphelper.showWorld(map)
  },
  error: function(error) {
    //alert('Geolocation failed: '+error.message);
  },
  not_supported: function() {
    //alert("Your browser does not support geolocation");
  },
  always: function() {
    //alert("Done!");
  }
});

    
    $http({url:'json/countries.json'}).success(function (data) {
    	
    	var helper = new CountriesHelper(data);
    	$scope.continents = helper.getContinents();
    	//$ionicScrollDelegate.$getByHandle('mainScroll').resize()
    })
    $scope.showContinent = function (continent) {
    	$scope.displayMode = "countries";
    	$scope.countries = continent.countries;
    	
    	//$ionicScrollDelegate.$getByHandle('mainScroll').resize()
    }
    $scope.showCountry = function (country) {
    	maphelper.showCountry(map,country.name)
    	
    }
})
function CountriesHelper(input) {
	
	this.type = this.buildType(input.fields);
	var continents = {}

	this.countries = input.data.map(function (countryField) {
		var country = new this.type(countryField)
		var continentName = country.continent;
		var continent = continents[continentName];
		var region;
		if (!continent) {
			continent = continents[continentName] = {
				name:continentName,
				countries:[], 
				regions:{},
				className: continentName.toLowerCase().replace(/\s*/g,'')
		}
	}

		var regionName = country.region,
			region = continent.regions[regionName]
		if (!region) {
			region = continent.regions[regionName] = {name:regionName,countries:[]}
		}
		region.countries.push(country)
		continents[continentName].countries.push(country)
		return country
	},this)
	this.continents = continents
	
}
CountriesHelper.prototype = {
	getContinents: function () {
		if (!this.continentsArray) {
			var continentsArray = []
			for (var i in this.continents) {
				continentsArray.push(this.continents[i])
			}
			this.continentsArray = continentsArray
		}
		return this.continentsArray
	},
	buildType: function (fields) {
		function Country(row) {
			this.row = row
		}
		fields.forEach(function (field, index) {
			Object.defineProperty(this,field, {
				enumerable: true,
				get: function () {
					return this.row[index]
				}
			})
		},Country.prototype)
		Object.defineProperty(Country.prototype,"className",{
			get: function () {
				return this.name.toLowerCase().replace(/s*/g,'')
			}
		} )
		return Country;
	}

}