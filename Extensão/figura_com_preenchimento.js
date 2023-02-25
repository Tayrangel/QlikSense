/*globals define*/
define( ["qlik", "jquery", "text!./style.css"], function ( qlik, $, cssContent ) {
	'use strict';
	$( "<style>" ).html( cssContent ).appendTo( "head" );
	function createRows ( rows, dimensionInfo ) {
		var html = "";
		rows.forEach( function ( row ) {
			html += '<tr>';
			row.forEach( function ( cell, key ) {
				if ( cell.qIsOtherCell ) {
					cell.qText = dimensionInfo[key].othersLabel;
				}
				html += "<td ";
				if ( !isNaN( cell.qNum ) ) {
					html += "class='numeric'";
				}
				html += '>' + cell.qText + '</td>';
			} );
			html += '</tr>';
		} );
		return html;
	}

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
					min: 0
				},
				measures: {
					uses: "measures",
					min: 0
				},
				sorting: {
					uses: "sorting"
				},
				settings: {
					uses: "settings"
				}
			}
		},
		snapshot: {
			canTakeSnapshot: true
		},
		paint: function ( $element, layout ) {
			var numero = layout.qHyperCube.qDataPages[0].qMatrix[0][0].qText;
			
			//console.log(layout);
			var html = '';
			
			html += '<div class="pai">';
			html += '<div class="img_figura"></div>';
			html += '<div class="legenda"> '+ numero +' </div>';
			html += '</div>';
			
			$element.html(html);
			
			$(".img_figura").css("background-image", "linear-gradient(to-top, gold "+ numero +", black)");
			
			var altura = ($("legenda").height()+$(".legenda").width())*0.25;
			
			$(".legenda").css("font-size", altura);
		}
	};
} );
