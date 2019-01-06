var m = require('mithril');

var data = require('./data');

var Pie = require('../../Library/Pie');

var Example = {
	view: function(vnode) {
		return [
			m('h3', 'Example of a Doughnut Chart'),
			m(Pie, {
				data: data,
				valAccessor: function(obj) {
					return obj['percentage']
				},
				labelAccessor: 'label',
				width: 230,
				height: 230,
				margins: {
					top: 60,
					bottom: 60,
					left: 80,
					right: 80
				},
				innerRadius: 0.5,
				colors: ["#61C0BF", "#DA507A", "#BB3D49", "#DB4547"],
				borderWidth: 1,
			})
		];
	}
}

module.exports = Example;