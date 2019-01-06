function LinearGradient(vnode) 
{	var fromOffset = vnode.attrs.fromOffset || '0%';
	var fromOpacity = vnode.attrs.fromOpacity || 1;
	var toOffset = vnode.attrs.toOffset || '100%';
	var toOpacity = vnode.attrs.toOpacity || 1;
	var vertical = vnode.attrs.vertical || 1;

	if (vertical && !vnode.attrs.x1 && !vnode.attrs.x2 && !vnode.attrs.y1 && !vnode.attrs.y2) {
		var x1 = '0';
		var x2 = '0';
		var y1 = '0';
		var y2 = '1';
	}

	return {
		view: function(vnode) {
			return m('defs', m('linearGradient', {
				id: vnode.attrs.id,
				x1: vnode.attrs.x1 || vnode.state.x1,
				y1: vnode.attrs.y1 || vnode.state.y1,
				x2: vnode.attrs.x2 || vnode.state.x2,
				y2: vnode.attrs.y2 || vnode.state.y2,
				gradientTransform: vnode.attrs.rotate ? "rotate(" + vnode.attrs.rotate + ")" : vnode.attrs.transform
			}, [
			!!vnode.children && vnode.children, 
			!vnode.children && m('stop', {
					offset: vnode.state.fromOffset,
					stopColor: vnode.attrs.from,
					stopOpacity: vnode.state.fromOpacity
				}), 
			!vnode.children && m('stop', {
					offset: vnode.state.toOffset,
					stopColor: vnode.attrs.to,
					stopOpacity: vnode.state.toOpacity
				}),

			]))
		}
	}
}

function renderVerticalGradient(svgDefElem, gradientId) {
	return createSVG('linearGradient', {
		inside: svgDefElem,
		id: gradientId,
		x1: 0,
		x2: 0,
		y1: 0,
		y2: 1
	});
}

function setGradientStop(gradElem, offset, color, opacity) {
	return createSVG('stop', {
		'inside': gradElem,
		'style': `stop-color: ${color}`,
		'offset': offset,
		'stop-opacity': opacity
	});
}

function makeGradient(svgDefElem, color, lighter = false) {
	let gradientId = 'path-fill-gradient' + '-' + color + '-' + (lighter ? 'lighter' : 'default');
	let gradientDef = renderVerticalGradient(svgDefElem, gradientId);
	let opacities = [1, 0.6, 0.2];
	if (lighter) {
		opacities = [0.4, 0.2, 0];
	}

	setGradientStop(gradientDef, "0%", color, opacities[0]);
	setGradientStop(gradientDef, "50%", color, opacities[1]);
	setGradientStop(gradientDef, "100%", color, opacities[2]);

	return gradientId;
}

function createSVG(tag, o) {
	var element = document.createElementNS("http://www.w3.org/2000/svg", tag);

	for (var i in o) {
		var val = o[i];

		if (i === "inside") {
			$(val).appendChild(element);
		} else if (i === "around") {
			var ref = $(val);
			ref.parentNode.insertBefore(element, ref);
			element.appendChild(ref);

		} else if (i === "styles") {
			if (typeof val === "object") {
				Object.keys(val).map(prop => {
					element.style[prop] = val[prop];
				});
			}
		} else {
			if (i === "className") {
				i = "class";
			}
			if (i === "innerHTML") {
				element['textContent'] = val;
			} else {
				element.setAttribute(i, val);
			}
		}
	}

	return element;
}

module.exports = {
	createSVG: createSVG,
	makeGradient: makeGradient,
	renderVerticalGradient: renderVerticalGradient,
	setGradientStop: setGradientStop,
	LinearGradient: LinearGradient
}