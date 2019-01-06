var m = require('mithril');


var pieExample = require('../Examples/Pie-chart/index');

var lineExample = require('../Examples/Line-chart/index');

var barExamples = require('../Examples/Bar-charts/index');

var areaExample = require('../Examples/Area-chart/index');

var bubbleEx = require('../Examples/Bubble-chart/index');

var chart_dimensions = {
	width: 500,
	height: 400
};

var margins = {
	top: 30, 
	bottom: 30,
	left: 50,
	right: 20
};
var App = {
	view: function(vnode) {
		return [
			m('h1', 'Welcome to Dom-viz'),
			m('h2', 'Here is the demo page for various charts'),
			m('h3', 'Line charts'),
			m(lineExample),
			m('h3', 'Area charts'),
			m(areaExample),
			m('h3', 'OHLC charts'),
			m('h3', 'Candlestick charts'),
			m('h2', 'Bar charts'),
			m(barExamples, {
				width: chart_dimensions.width,
				height: chart_dimensions.height,
				margin: margins,
				maxY: 100
			}),
			m('h3', 'Grouped bar charts'),
			m('h3', 'Stacked bar charts'),
			m('h3', 'Waterfall'),
			m('h3', 'Scatter & Bubble charts'),
			//Idea: use this dataset: https://waffle-server.gapminder.org/api/ddf/ql?_language=en&from=datapoints&animatable=time&select_key@=geo&=time;&value@=income/_per/_person/_gdppercapita/_ppp/_inflation/_adjusted&=life/_expectancy/_years&=population/_total;;&where_$and@_geo=$geo;;;&join_$geo_key=geo&where_un/_state:true;;;&order/_by@=time
			//Reproduce bubble chart from https://www.gapminder.org/tools/#$chart-type=bubbles
			m(bubbleEx),
			m('h3', 'Pie & Doughnut Charts'),
			m(pieExample),
			m('h3', 'Tree map')
		];
	}
}

m.route(document.body, '/', {
	'/': App
})