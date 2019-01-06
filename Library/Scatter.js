var m = require('mithril');

var Linear = require('./Linear');

function max(arr) {
	return arr.reduce(function(a, b) {
		return Math.max(a, b);
	})
}


function Scatter(vnode) {
	var xScale = Linear([-5, 15], [0, vnode.attrs.width]);
	var yScale = Linear([-20, 25], [vnode.attrs.height, 0]);
	var zScale = Linear([0, 100], [0, 30]);

	var dataToDraw = vnode.attrs.data.map(function(val, i) {
		return {
			x: xScale(vnode.attrs.xAccessor(val)),
			y: yScale(vnode.attrs.yAccessor(val)),
			r: zScale(vnode.attrs.zAccessor(val))
		};
	});
	// console.log(dataToDraw);
	return {
		view: function(vnode) {
			return m('svg', {
				width: vnode.attrs.width,
				height: vnode.attrs.height
			}, m('g', {

				},
				dataToDraw.map(function(val, i) {
					return m('circle', {
						cx: val.x,
						cy: val.y,
						r: val.r,
						style: {
						// 	stroke: vnode.attrs.stroke,
						// 	strokeWidth: vnode.attrs.strokeWidth,
							fill: 'blue'
						}

					});
				})
			))
		}
	}
}

module.exports = Scatter;