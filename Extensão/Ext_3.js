define( [ "qlik"
],
function ( qlik) {

	return {

		initialProperties: {
			qhypercubeDef: {
				qDimensions: [],
				qMeasures: [],
				qInitialDataFetch: [{
					qWidth: 10,
					qHeight: 1000
				}]
			}
		},

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
					uses: "settings",
					items: {
						MyIntPropX: {
							type: "items",
							label: "Valor Mínimo X e Valor Máximo Y",
							items: {
								MyIntPropMin: {
								type: "integer",
								label: "Valor Mínimo X",
								ref: "myproperties.min",
								defaultValue: "10"
								},
								MyIntPropMax: {
									type: "integer",
									label: "Valor Máximo Y",
									ref: "myproperties.max",
									defaultValue: "10"
								},
								MyIntPropNum: {
									type: "number",
									label: "Valor Numérico",
									ref: "myproperties.num",
									defaultValue: "10.50"
								},
								MyIntPropString: {
									type: "string",
									label: "Expressão de cor ou valor",
									ref: "myproperties.cor_valor",
									defaultValue: "",
									expression: "always",
									show: true
								}
							}
						}
					}
				}
			}
		},
		
		support : {
			snapshot: true,
			export: true,
			exportData : true
		},
		
		paint: function ($element, layout) {
			//add your rendering code here
			$element.html( layout.MyIntPropString );
			//needed for export
			return qlik.Promise.resolve();
		}
	};

} );