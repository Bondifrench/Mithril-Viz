var m = require('mithril');
var Linear = require('./Linear');

function Bar(vnode) {
	return {
		view: function(vnode) {
			return m('rect', {
				x: vnode.attrs.x || 0,
				y: vnode.attrs.y || 0,
				width: vnode.attrs.width,
				height: vnode.attrs.height,
				rx: vnode.attrs.rx,
				ry: vnode.attrs.ry,
				style: {
					fill: vnode.attrs.fill || 'steelblue',
					fillOpacity: vnode.attrs.fillOpacity,
					stroke: vnode.attrs.stroke,
					strokeWidth: vnode.attrs.strokeWidth,
					strokeDasharray: vnode.attrs.strokeDasharray,
					strokeLinecap: vnode.attrs.strokeLinecap,
					strokeLinejoin: vnode.attrs.strokeLinejoin,
					strokeMiterlimit: vnode.attrs.strokeMiterlimit,
					strokeOpacity: vnode.attrs.strokeOpacity,
				}

			})
		}
	}
}


function OldBar(vnode) {
	var minY = vnode.attrs.minY || 0;
	var maxY = vnode.attrs.maxY || vnode.attrs.data.reduce(function(a, b) {
		return Math.max(a, b);
	});

	var xScale = Linear([minY, maxY], [0, vnode.attrs.width]);
	var yScale = Linear([minY, maxY], [vnode.attrs.height, 0])
	return {
		view: function(vnode) {
			return m('svg', {
					width: vnode.attrs.width,
					height: vnode.attrs.height,
					style: {
						backgroundColor: '#d5e1de',
					}

				},
				m('g', {

					}, vnode.attrs.data.map(function(el, i) {
						var options = vnode.attrs.orientation == 'horizontal' ? {
							x: 0,
							y: i * vnode.attrs.height / vnode.attrs.data.length,
							width: xScale(el),
							height: (vnode.attrs.height - vnode.attrs.gutter) / vnode.attrs.data.length,
							style: {
								fill: vnode.attrs.fill,
								fillOpacity: vnode.attrs.fillOpacity,
								stroke: vnode.attrs.stroke,
								strokeWidth: vnode.attrs.strokeWidth,
								strokeDasharray: vnode.attrs.strokeDasharray,

							}
						} : {
							x: i * vnode.attrs.width / vnode.attrs.data.length,
							y: yScale(el),
							width: (vnode.attrs.width - vnode.attrs.gutter) / vnode.attrs.data.length,
							height: vnode.attrs.height - yScale(el),
							style: {
								fill: vnode.attrs.fill,
								fillOpacity: vnode.attrs.fillOpacity,
								stroke: vnode.attrs.stroke,
								strokeWidth: vnode.attrs.strokeWidth,
								strokeDasharray: vnode.attrs.strokeDasharray,
							}

						};
						return m('rect', options)
					}),
				));
		}
	}
}

module.exports = Bar;