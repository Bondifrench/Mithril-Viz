var m = require('mithril');
var Linear = require('./Linear');

function linePath(arr) {
	return arr.map(function(val, i) {
			return (i ? 'L' : 'M') + val.x + ',' + val.y;
		})
		.join(' ');
}


function Line(vnode) {

	var minY = vnode.attrs.minY || 0;
	var maxY = vnode.attrs.maxY || vnode.attrs.data.map(vnode.attrs.getY).reduce(function(a, b) {
		return Math.max(a, b);
	});
	var xScale = Linear([0, vnode.attrs.data.length - 1], [0, vnode.attrs.width]);
	var yScale = Linear([minY, maxY], [vnode.attrs.height, 0]);
	var dataToDraw = vnode.attrs.data.map(function(val, i) {
		return {
			x: xScale(vnode.attrs.getX(i)),
			y: yScale(vnode.attrs.getY(val))
		};
	});
	// console.log(vnode.attrs.data.map(vnode.attrs.getY).reduce(function (a, b) {
	// 	return Math.max(a, b);
	// }));
	return {
		view: function(vnode) {
			return m('svg', {
				width: vnode.attrs.width,
				height: vnode.attrs.height
			}, m('g', {

				},
				m('path', {
					d: linePath(dataToDraw),
					style: {
						stroke: vnode.attrs.stroke,
						strokeWidth: vnode.attrs.strokeWidth,
						strokeDasharray: vnode.attrs.strokeDasharray,
						fill: 'none'
					}
				})
			))
		}
	}
}

module.exports = Line;