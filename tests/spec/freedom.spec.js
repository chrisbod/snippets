describe("workflow tests", function () {

	var freedom = new Freedom();

	beforeEach(function (done) {
		freedom.setLocation({
			lat: 35.0553307,
			long: 34.0148453

		}).then(done)
	})

	

	;
	it("should be able to provide activity information", function (done) {
		freedom.getActivities().then(function(){
			expect(details.activities).toEqual([
				{
					id: 0,
					name: "Swimming (Sea)",
					rating: 5,
					checkins: 1234,
					distance: 3,
					summary: "Shallow, good for kids, paid beds",
					geopos: {}
				},
				{
					id:1,
					name: "Cliff Jumping",
					rating: 2,
					checkins:34,
					distance: 100,
					geopos: {lat:0,long:0},
					summary: "hard to access, very hard to climb back"


				}

			]);
			done();
		});
		it("should be able to get terrain info", function (done) {
			freedom.getTerrains().then(function (terrains) {
			expect(terrains).toEqual([
				{
					id: 0,
					name: "Beach",
					distance: 0
				},
				{ id: 1,
					name:"Sea",
					distance: 5,

				},
				{
					id: 2,
					name: "Cliffs",
					distance: 100
				}				
			]);
			done();
		})
		})
	})
})