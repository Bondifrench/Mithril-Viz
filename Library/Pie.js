var m = require('mithril');
var Linear = require('./Linear');
// https://codepen.io/danbrady/pen/NqGqYz?editors=0010
function degreesToRadians(deg) {
	return deg * Math.PI / 180;
}

function radiansToDegrees(rad) {
	return rad * 180 / Math.PI;
}

function sum(a, b) {
	return a + b;
}

function plus(arr1, arr2) {
	return [arr1[0] + arr2[0], arr1[1] + arr2[1]];
}

function times(k, arr) {
	return [k * arr[0], k * arr[1]];
}

function onCircle(r, angle) {
	return times(r, [Math.sin(angle), -Math.cos(angle)]);
}

function Pie(vnode) {
	var center = [vnode.attrs.width / 2, vnode.attrs.height / 2];

	// var padAngle = degreesToRadians(vnode.attrs.padAngle);

	var radius = Math.min(vnode.attrs.width, vnode.attrs.height) / 2;
	var innerRadius = radius * Math.min(vnode.attrs.innerRadius, 1);

	var values = vnode.attrs.data.map(vnode.attrs.valAccessor);
	var s = values.reduce(sum, 0)
	var scale = Linear([0, s], [0, 2 * Math.PI]);

	var n = values.length;
	var t = 0;
	var sectors = [];
	for (var i = 0; i < n; ++i) {
		var value = values[i]
		sectors.push({
			data: vnode.attrs.data[i],
			index: i,
			center: center,
			r: innerRadius,
			R: radius,
			start: scale(t),
			end: scale(t + value)
		})
		t += value;
	}

	function buildPath(center, r, R, start, end) {
		var a = plus(center, onCircle(R, start));
		var b = plus(center, onCircle(R, end));
		var c = plus(center, onCircle(r, end));
		var d = plus(center, onCircle(r, start));
		var large = (end - start > Math.PI) ? 1 : 0;

		// For a Pie chart, just the following is necessary
		// var path = "M" + center.join() +
		// 	" L" + a.join() +
		// 	" A" + R + "," + R + " 0 " + large + ",1 " + b.join() +
		// 	" z";

		// Following is for a doughnut chart
		var path = "M" + a.join() +
			" A" + R + "," + R + " 0 " + large + ",1 " + b.join() +
			" L" + c.join() +
			" A" + r + "," + r + " 0 " + large + ",0 " + d.join() +
			" z";

		return path;
	}

	return {
		view: function(vnode) {
			return m('svg', {
				width: vnode.attrs.width,
				height: vnode.attrs.height,
			}, m('g', {

				},
				sectors.map(function(d, i) {
					return m('path', {
						key: i,
						d: buildPath(center, innerRadius, radius, d.start, d.end),
						fill: vnode.attrs.colors[i],
						style: {
							strokeWidth: vnode.attrs.borderWidth,
							stroke: "inherit:darker(0.6)" //borderColor(d.data),
						}
						// onMouseEnter: vnode.attrs.handleTooltip,
						// onMouseMove: vnode.attrs.handleTooltip,
						// onMouseLeave: vnode.attrs.hideTooltip
					})
				})
			));
		}
	}
}

module.exports = Pie;