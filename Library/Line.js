var m = require('mithril');

function Line(vnode) {
	return {
		view: function (vnode) {
			return m('line', {
				x1: vnode.attrs.from.x,
				y1: vnode.attrs.from.y,
				x2: vnode.attrs.to.x,
				y2: vnode.attrs.to.y,
				style: {
					stroke: vnode.attrs.stroke,
					strokeWidth: vnode.attrs.strokeWidth,
					strokeDasharray: vnode.attrs.strokeDasharray,
					transform: vnode.attrs.transform
				}
			})
		}
	}
}

module.exports = Line;

