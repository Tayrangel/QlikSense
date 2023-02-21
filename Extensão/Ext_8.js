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
								},
								MyIntPropButton: {
									label: "Botão",
									ref: "myproperties.botão",
									component: "button",
									action: function(data) {
											//add your button action hera
											alert("My visalization extension name is '" + data.visualization + "' and have id '" + data.qInfo.qID + "'.");
									}
								}
							}
						},

						MyIntPropY: {
							type: "items",
							label: "Valor vertical ou horizontal",
							items: {
								Grupodebotao: {
								type: "string",
								component: "dropdown",
								label: "Escolha tipo de valor",
								ref: "myproperties.grupo_botao",
								options: [{
									value: "v",
									label: "Vertical",
									tooltip: "Select for vertical"
								}, {
									value: "h",
									label: "Horizontal",
									tooltip: "Select for horizontal"
								}],
								defaultValue: "v"
								},
								MyCheckProp: {
									type: "boolean",
									label: "Eixo visível",
									ref: "myproperties.eixo_visível",
									defaultValue: true
								},
								MyColorPicker: {
									label:"Cores",
									component: "color-picker",
									ref: "myproperties.myColor",
									type: "object"
									
								},
								MyLink: {
									label:"Link Qlik",
									component: "link",
									url:"http://www.qlik.com/"
								},
								MyMedia: {
									label:"Media",
									component: "media",
									ref: "myproperties.myMedia",
									layoutRef: "myMedia",
									type: "string"
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
			var valor_html = layout.MyIntPropNum + layout.MyIntPropMin
			$element.html( layout.MyIntPropString );
			//needed for export
			return qlik.Promise.resolve();
		}
	};

} );