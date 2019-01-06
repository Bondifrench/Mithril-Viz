var m = require('mithril');
var Linear = require('../../Library/Linear');
var Group = require('../../Library/Group');
var Bar = require('../../Library/Bar');
var Axis = require('../../Library/Axis');

var data = require('./data')(12, 0, 100)

function ChartContainer(vnode) {
	var minY = vnode.attrs.minY || 0;
	var maxY = vnode.attrs.maxY || data.reduce(function(a, b) {
		return Math.max(a, b);
	});
	//These need to be curried functions
	var xScale = Linear([minY, maxY], [0, vnode.attrs.width]);
	var yScale = Linear([1, data.length + 1], [vnode.attrs.height, 0])

	return {
		view: function(vnode) {
			return m('svg', { // see https://bl.ocks.org/mbostock/3019563 for conventions
				width: vnode.attrs.width + vnode.attrs.margin.left + vnode.attrs.margin.right,
				height: vnode.attrs.height + vnode.attrs.margin.top + vnode.attrs.margin.bottom
			}, m(Group, {
					top: vnode.attrs.margin.top,
					left: vnode.attrs.margin.left,
					// transform: 'translate(' + vnode.attrs.margin.left + ',' + vnode.attrs.margin.top + ')'
				}, data.map(function(d, i) {
					return [m(Bar, {
							x: 0,
							y: i * vnode.attrs.height / data.length,
							width: xScale(d),
							height: (vnode.attrs.height - 50) / data.length,
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
						}),
						m('text', {
							x: xScale(d) / 2,
							y: i * vnode.attrs.height / data.length,
							fill: 'white',
							fontSize: 14,
							dy: '1.2em'
						}, d)
					]
				}),
				m(Axis, { //Vertical axis
					top: 0,
					left: 0,
					range: [0, vnode.attrs.height],
					scale: yScale,
					orientation: 'left',
					rangePadding: 5,
					hideAxisLine: false,
					stroke: 'blue',
					strokeWidth: '3',
					strokeDasharray: '1 3',
					hideTicks: false,
					tickValues: data.map(function(val, i) {
						return i + 1;
					}),
					tickLabelProps: function(val, idx) {
						return {
							dy: '0.25em',
							textAnchor: 'middle',
							fontFamily: 'Arial',
							fontSize: 10,
							fill: 'black'
						}
					},
					tickLength: 10,
					tickStroke: 'green'

				}),
				m(Axis, { //Horizontal axis
					top: vnode.attrs.height,
					left: 0,
					range: [0, vnode.attrs.width],
					scale: xScale,
					orientation: 'bottom',
					rangePadding: 5,
					hideAxisLine: false,
					stroke: 'red',
					strokeWidth: '3',
					strokeDasharray: '1 2',
					hideTicks: false,
					tickValues: [0, 10, 20, 30, 40, 50, 60, 70, 80, 90, 100],
					tickFormat: function(val, i) {
						return val
					},
					tickLength: 10,
					tickStroke: 'red'
				})
			))
		}
	}
}

module.exports = ChartContainer;