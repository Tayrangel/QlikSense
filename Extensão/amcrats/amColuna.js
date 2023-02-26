require.config({
    paths: {
		"core": "/extensions/amColuna/core",
		"charts": "/extensions/amColuna/charts",
		"animated": "/extensions/amColuna/animated",
	},
	//configuração do amCharts
    shim: {
        'amcharts4/core': {
            init: function () {
                return window.am4core;
            }
        },
        'amcharts4/charts': {
            deps: ['core'],
            exports: 'charts',
            init: function () {
                return window.am4charts;
            }
        },
        'animated': {
            deps: ['core'],
            exports: 'animated',
            init: function () {
                return window.am4themes_animated;
            }
        }
    }
});

/*globals define*/
define( ["qlik", "jquery", "text!./style.css", "core", "charts", "animated"], function ( qlik, $, cssContent, core, charts, animated ) {
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
					min: 0,
					items: {
						imagens_bullet: {
							type: "string",
							expression: "optional",
							expressionType: "dimension",
							ref: "qAttributeExpressions.0.qExpression",
							label: "Imagens no Bullet"
						}
					}
				},
				measures: {
					uses: "measures",
					min: 0
				},
				sorting: {
					uses: "sorting"
				},
				settings: {
					uses: "settings",
					items: {
						MyStringProp: {
							ref: "bullet",
							type: "boolean",
							label: "Imagem",
							defaultValue: false
						}
					}
				}
			}
		},
		snapshot: {
			canTakeSnapshot: true
		},
		paint: function ( $element, layout ) {
			var html = '<div id="chartdiv">Hello World</div>';
			$element.html(html);
			
			var numero_de_linhas = layout.qHyperCube.qDataPages[0].qMatrix.length;
			var dados =[];
			var c=0;
			
			for(c=0;c<numero_de_linhas; c++){
			 	dados.push({
					"name": layout.qHyperCube.qDataPages[0].qMatrix[c][0].qText,
					"steps": layout.qHyperCube.qDataPages[0].qMatrix[c][1].qNum,
					"href": layout.qHyperCube.qDataPages[0].qMatrix[c][0].qAttrExps.qValues[0].qText,
				});
			}
			 
			 
			// Retirado do site amCharts e editado para que retorna-se as edições do painel qlik
			am4core.ready(function() {

				// Themes begin
				am4core.useTheme(am4themes_animated);
				// Themes end

				/**
				 * Chart design taken from Samsung health app
				 */

				var chart = am4core.create(layout.qInfo.qId, am4charts.XYChart);
				chart.hiddenState.properties.opacity = 0; // this creates initial fade-in
				chart.paddingBottom = 30;
				chart.data = dados;

				var categoryAxis = chart.xAxes.push(new am4charts.CategoryAxis());
				categoryAxis.dataFields.category = "name";
				categoryAxis.renderer.grid.template.strokeOpacity = 0;
				categoryAxis.renderer.minGridDistance = 10;
				categoryAxis.renderer.labels.template.dy = 35;
				categoryAxis.renderer.tooltip.dy = 35;

				var valueAxis = chart.yAxes.push(new am4charts.ValueAxis());
				valueAxis.renderer.inside = true;
				valueAxis.renderer.labels.template.fillOpacity = 0.3;
				valueAxis.renderer.grid.template.strokeOpacity = 0;
				valueAxis.min = 0;
				valueAxis.cursorTooltipEnabled = false;
				valueAxis.renderer.baseGrid.strokeOpacity = 0;

				var series = chart.series.push(new am4charts.ColumnSeries);
				series.dataFields.valueY = "steps";
				series.dataFields.categoryX = "name";
				series.tooltipText = "{valueY.value}";
				series.tooltip.pointerOrientation = "vertical";
				series.tooltip.dy = - 6;
				series.columnsContainer.zIndex = 100;

				var columnTemplate = series.columns.template;
				columnTemplate.width = am4core.percent(50);
				columnTemplate.maxWidth = 66;
				columnTemplate.column.cornerRadius(60, 60, 10, 10);
				columnTemplate.strokeOpacity = 0;

				series.heatRules.push({ target: columnTemplate, property: "fill", dataField: "valueY", min: am4core.color("#e5dc36"), max: am4core.color("#5faa46") });
				series.mainContainer.mask = undefined;

				var cursor = new am4charts.XYCursor();
				chart.cursor = cursor;
				cursor.lineX.disabled = true;
				cursor.lineY.disabled = true;
				cursor.behavior = "none";
				
				if(layout.bullet) {
				
					//Inicio Bullet
					var bullet = columnTemplate.createChild(am4charts.CircleBullet);
					bullet.circle.radius = 30;
					bullet.valign = "bottom";
					bullet.align = "center";
					bullet.isMeasured = true;
					bullet.mouseEnabled = false;
					bullet.verticalCenter = "bottom";
					bullet.interactionsEnabled = false;

					var hoverState = bullet.states.create("hover");
					var outlineCircle = bullet.createChild(am4core.Circle);
					outlineCircle.adapter.add("radius", function (radius, target) {
						var circleBullet = target.parent;
						return circleBullet.circle.pixelRadius + 10;
					})

					var image = bullet.createChild(am4core.Image);
					image.width = 60;
					image.height = 60;
					image.horizontalCenter = "middle";
					image.verticalCenter = "middle";
					image.propertyFields.href = "href";

					image.adapter.add("mask", function (mask, target) {
						var circleBullet = target.parent;
						return circleBullet.circle;
					})

					var previousBullet;
					chart.cursor.events.on("cursorpositionchanged", function (event) {
						var dataItem = series.tooltipDataItem;

						if (dataItem.column) {
							var bullet = dataItem.column.children.getIndex(1);

							if (previousBullet && previousBullet != bullet) {
								previousBullet.isHover = false;
							}

							if (previousBullet != bullet) {

								var hs = bullet.states.getKey("hover");
								hs.properties.dy = -bullet.parent.pixelHeight + 30;
								bullet.isHover = true;

								previousBullet = bullet;
							}
						}
					})
				}
			}); // end am4core.ready()
			
			return qlik.Promise.resolve();
		}
	};
} );