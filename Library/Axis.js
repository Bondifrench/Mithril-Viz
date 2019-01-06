var m = require('mithril');
var Group = require('./Group');
var Line = require('./Line');

var Orient = {
	left: 'left',
	right: 'right',
	top: 'top',
	bottom: 'bottom'
}

function Point(coord) {
	return {
		x: coord.x,
		y: coord.y
	}
}

function center(scale) {
	// body...
}

function identity(x) {
	return x;
}

function Axis(vnode) {
	// var values = vnode.attrs.scale.ticks ? vnode.attrs.scale.ticks(vnode.attrs.numTicks) : vnode.attrs.scale(vnode.attrs.numTicks);
	var values = vnode.attrs.tickValues; //Should be an array
	var format = vnode.attrs.tickFormat ? vnode.attrs.tickFormat : identity;
	// if (vnode.attrs.tickFormat) format = vnode.attrs.tickFormat;
	var range = vnode.attrs.range;
	var range0 = range[0] + 0.5 - vnode.attrs.rangePadding;
	var range1 = range[range.length - 1] + 0.5 + vnode.attrs.rangePadding;

	var horizontal = vnode.attrs.orientation !== Orient.left && vnode.attrs.orientation !== Orient.right;
	var isLeft = vnode.attrs.orientation === Orient.left;
	var isTop = vnode.attrs.orientation === Orient.top;
	var tickSign = isLeft || isTop ? -1 : 1;

	// var position = (scale.bandwith ? center : identity)(scale.copy());
	var position = vnode.attrs.scale;
	var axisFromPoint = Point({
		x: horizontal ? range0 : 0,
		y: horizontal ? 0 : range0
	});
	var axisToPoint = Point({
		x: horizontal ? range1 : 0,
		y: horizontal ? 0 : range1
	});

	var tickLabelFontSize = 10;

	var tickLabelProps = vnode.attrs.tickLabelProps || function(tickValue, idx) {
		return {
			textAnchor: 'middle',
			fontFamily: 'Arial',
			fontSize: 10,
			fill: 'black'
			}
	};

	return {
		view: function(vnode) {
			return m(Group, {
				top: vnode.attrs.top,
				left: vnode.attrs.left
			}, [
				values.map(function(val, idx) {
					if (vnode.attrs.hideZero && val === 0) return null;
					var tickFromPoint = Point({
						x: horizontal ? position(val) : 0,
						y: horizontal ? 0 : position(val)
					});
					var tickToPoint = Point({
						x: horizontal ? position(val) : tickSign * vnode.attrs.tickLength,
						y: horizontal ? vnode.attrs.tickLength * tickSign : position(val)
					});
					var tickLabelPropsObj = tickLabelProps(val, idx);
					tickLabelFontSize = Math.max(
						tickLabelFontSize,
						tickLabelPropsObj.fontSize || 0)
					return m(Group, {
							// key: `mx-tick-${val}-${idx}`,
							transform: vnode.attrs.tickTransform
						}, !vnode.attrs.hideTicks && m(Line, {
							from: tickFromPoint,
							to: tickToPoint,
							stroke: vnode.attrs.tickStroke
						}),
						vnode.attrs.tickComponent ? vnode.attrs.tickComponent({
							x: tickToPoint.x,
							y: tickToPoint.y + (horizontal && !isTop ? tickLabelFontSize : 0),
							formattedValue: format(val, idx),
							...tickLabelPropsObj
						}) :
						m('text', {
							x: tickToPoint.x,
							y: tickToPoint.y + (horizontal && !isTop ? tickLabelFontSize : 0),
							// ...tickLabelPropsObj
						}, format(val, idx))
					)
				}), !vnode.attrs.hideAxisLine && m(Line, {
					from: axisFromPoint,
					to: axisToPoint,
					stroke: vnode.attrs.stroke,
					strokeWidth: vnode.attrs.strokeWidth,
					strokeDasharray: vnode.attrs.strokeDasharray
				}),
				// label & m(Text, {
				// 	className: cx('mx-axis-label', labelClassName),
				// 	...getLabelTransform({
				// 		labelOffset,
				// 		labelProps,
				// 		orientation,
				// 		range,
				// 		tickLabelFontSize,
				// 		vnode.attrs.tickLength
				// 	}),
				// 	...labelProps
				// }, label)
			])
		}
	}
}

module.exports = Axis;