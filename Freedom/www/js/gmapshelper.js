function GMapsHelper() {
	
}
GMapsHelper.prototype = {

	showCountry: function (map,countryName) {
		GMaps.geocode({
  address: countryName,
  callback: function(results, status) {
    if (status == 'OK') {
    	console.log(results)
    	var bounds = results[0].geometry.bounds;
    	map.fitBounds(bounds)
    	map.zoomIn(1)
	  	/*map.fitLatLngBounds([
	  	new google.maps.LatLng(bounds.west, bounds.north),
	  	new google.maps.LatLng(bounds.east, bounds.south)
	  	]);*/
      
    }
  }
});
	},
	fitToBounds: function (map,boundaryName) {
		//console.log(boundaryName)
		map.removeMarkers()
		var boundaries =  GMapsHelper.BOUNDARIES[boundaryName];
		//map.fitLatLngBounds([new google.maps.LatLng( bounds[0],bounds[1]),new google.maps.LatLng( bounds[2],bounds[3])])
	var latlngs = [{lat:boundaries[0], lng:boundaries[1]}, {lat:boundaries[2], lng:boundaries[3]}];
var bounds = [], markers = []
for (var i in latlngs) {
  var latlng = new google.maps.LatLng(latlngs[i].lat, latlngs[i].lng);
  bounds.push(latlng);
 /* markers.push(map.addMarker({
    lat: latlngs[i].lat,
    lng: latlngs[i].lng
  }));*/
}
//map.setZoom(5)
map.fitLatLngBounds(bounds)

if (boundaries[4] > 0) {
	map.zoomIn(boundaries[4])
} else if (boundaries[4]<0) {
	map.zoomOut(-boundaries[4])
}

//setTimeout(function () {
	//map.fitZoom()
//},4000)

/*var bounds = new google.maps.LatLngBounds();
for (var i = 0; i < markers.length; i++) {
 bounds.extend(markers[i].getPosition());
}*/

//map.map.fitBounds(bounds);
//map.fitLatLngBounds(bounds);


	},
	showWorld: function (map) {
		var bounds =  GMapsHelper.BOUNDARIES.world;
		allowedBounds = new google.maps.LatLngBounds(
	new google.maps.LatLng(bounds[0], bounds[1]),	// top left corner of map
	new google.maps.LatLng(bounds[2], bounds[3])
	)
		var k = 0.0; 
var n = allowedBounds .getNorthEast().lat() - k;
var e = allowedBounds .getNorthEast().lng() - k;
var s = allowedBounds .getSouthWest().lat() + k;
var w = allowedBounds .getSouthWest().lng() + k;
var neNew = new google.maps.LatLng( n, e );
var swNew = new google.maps.LatLng( s, w );
boundsNew = new google.maps.LatLngBounds( swNew, neNew );
map.fitBounds(boundsNew);
map.zoomIn(1)
	}
};

GMapsHelper.BOUNDARIES = {
	'world' : [85, -180,-85, 180,1],
	'africa': [36.928987, -22.978735,-37.669739, 62.802515,2],	// bottom right corner
	'asia': [77,37,-9.701353, 140.632649,1],
	'oceania': [0.421767, 112.780398,-48.528315, -177.434445,1],
	'europe': [70.764631, -32.476457,33.668047, 34.496200,1],
	'northamerica':[74.519803, -169.661074,16.763512, -37.744149,1],
	'southamerica':[12.855351, -107.021463,-55.002412, -32.665995,1],
	'antarctica':[-65, -180, -180, 180,-1]

}