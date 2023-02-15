define( [ "qlik"
],
function ( qlik) {

	return {
		definition: {
			type: "items",
			component: "accordion",
			items: {
				measures: {
					uses: "measures"
				},
				sorting: {
					uses: "sorting"
				},
				addons: {
					uses: "addons"
				},
				settings: {
					uses: "settings"
				}
			}
		},
		
		support : {
			snapshot: true,
			export: true,
			exportData : true
		},
		
		paint: function ($element) {
			//add your rendering code here
			$element.html( "Hello World!" );
			//needed for export
			return qlik.Promise.resolve();
		}
	};

} );