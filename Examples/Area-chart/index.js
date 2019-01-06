var m = require('mithril');
var Area = require('../../Library/Area')
var coinbase = require('./close.json')


var data = []
for (var key in coinbase.bpi) {
	data.push({
		date: key,
		value: coinbase.bpi[key]
	})
}

var Example = {
	view: function(vnode) {
		return [
			m(Area, {
				data: data,
				xAccessor: function(obj) {
					return obj;
				},
				yAccessor: function(obj) {
					return obj["value"];
				},
				width: 400,
				height: 300,
				margins: {
					top: 60,
					bottom: 60,
					left: 80,
					right: 80
				},
				fill: 'green',
				fillOpacity: 0.5,
				stroke: 'green',
				strokeWidth: 5,
				strokeDasharray: ''
			})
		];
	}
}

module.exports = Example;