var m = require('mithril');

var data = require('./data');

var Bubbles = require('../../Library/Scatter');

var Example = {
	view: function(vnode) {
		return [
			m('h3', 'Example of a Bubble chart'),
			m(Bubbles, {
				data: data,
				xAccessor: function(obj) {
					return obj['x'];
				},
				yAccessor: function(obj) {
					return obj['y'];
				},
				zAccessor: function (obj) {
					return obj['value'];
				},
				width: 320,
				height: 444,
				margins: {
					top: 60,
					bottom: 60,
					left: 80,
					right: 80
				},

			})
		]
	}
}

module.exports = Example;