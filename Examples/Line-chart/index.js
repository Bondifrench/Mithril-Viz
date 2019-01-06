var m = require('mithril');
var Line = require('../../Library/LinePath')
var coinbase = require('./close.json')

var Stock = {
	quotes: [],
	loadQuotes: function (ticker) {
		return m.request({
			url: "https://api.iextrading.com/1.0/stock/"+ticker+"/chart/1y"
		})
		// .then(console.log)
	}
}
var data = []
for (var key in coinbase.bpi) {
	data.push({
		date: key,
		value: coinbase.bpi[key]
	})
}

//use https://api.iextrading.com/1.0/stock/adsk/chart/1y
function getPrices(obj) {
	return obj["close"];
}

var Example = {
	oninit: Stock.loadQuotes('adsk'),
	view: function(vnode) {
		return [
			m(Line, {
				data: data,
				getX: function(obj) {
					return obj;
				},
				getY: function(obj) {
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
				stroke: '#b2e9e4',
				strokeWidth: 2,
			})
		];
	}
}

module.exports = Example;