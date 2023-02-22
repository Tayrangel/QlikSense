/*globals define*/
define( ["qlik", "jquery", "text!./style.css"], function ( qlik, $, cssContent ) {
	'use strict';
	$( "<style>" ).html( cssContent ).appendTo( "head" );
	
	return {
		initialProperties: {
			qHyperCubeDef: {
				qDimensions: [],
				qMeasures: [],
				qInitialDataFetch: [{
					qWidth: 10,
					qHeight: 50
				}]
			}
		},
		definition: {
			type: "items",
			component: "accordion",
			items: {
				dimensions: {
					uses: "dimensions",
					min: 1,
					max: 1,
				},
				measures: {
					uses: "measures",
					min: 1,
					max: 2,
					items : {
						cores_kpi: {
						ref: "qDef.cor_medida",
						label: "Cor Hex",
						type: "string",
						defaultValue: "='#0000FF'",
						expression: "always"
						},
						cores_kpi2: {
						ref: "qAttributeExpressions.0.qExpression",
						label: "Cor por Expressão",
						type: "string",
						component: "expression",
						defaultValue: "='#0000FF'",
						expression: "always"
						}
					}
				},
				settings: {
					uses: "settings",
					items: {
						custom_attr: {
						ref: "tamanho",
						label: "Tamanho dos KPIs",
						type: "string",
						defaultValue: 30,
						expression: "always"
						},
					}
				}
			}
		},
		snapshot: {
			canTakeSnapshot: true
		},
		paint: function ( $element, layout ) {
			var html = "", self = this,
				hypercube = layout.qHyperCube,
				rowcount = hypercube.qDataPages[0].qMatrix.length,
				colcount = hypercube.qDimensionInfo.length + hypercube.qMeasureInfo.length;
			
			var div_id = layout.qInfo.qId;
			var tamanho = layout.tamanho
			var cores = layout.cores;
			
			console.log (layout);
			
			for (var c=0; c < layout.qHyperCube.qDataPages[0].qMatrix.length, c++) {
			
				var cor_1 = layout.qHyperCube.qDataPages[0].qMatrix[c][1].qAttrExps.qValues[0].qText;
				var cor_2 = layout.qHyperCube.qDataPages[0].qMatrix[c][2].qAttrExps.qValues[0].qText;
				
				html += "<div id = '" + div_id + "' style='font-size: "+ tamanho +"px; background-color: "+ cores +"; text-align:center;'>";
				html += layout.qHyperCube.qDataPages[0].qMatrix[c][0].qText;
				html += "</div>";
				html += "<div id = '" + div_id + "' style='font-size: "+ tamanho +"px; background-color: "+ cor_1 +"; text-align:center;'>";
				html += layout.qHyperCube.qDataPages[0].qMatrix[c][0].qText;
				html += "</div>";
				html += "<div id = '" + div_id + "' style='font-size: "+ tamanho +"px; background-color: "+ cor_2 +"; text-align:center;'>";
				html += layout.qHyperCube.qDataPages[0].qMatrix[c][2].qText;
				html += "</div>";
			}
			
			$element.html( html );
			
			return qlik.Promise.resolve();
		}
	};
} );