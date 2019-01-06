var m = require('mithril');

function Tooltip(vnode) {
	return {
		view: function (vnode) {
			return m('', {
				style: vnode.attrs.style || {
					position: 'absolute',
					backgrounColor: 'white',
					color: '#666666',
					padding: '.3rem .5rem',
					borderRadius: '3px',
					fontSize: '14px',
					boxShadow: '0 1px 2px rgba(33,33,33,0.2)',
					lineHeight: '1em',
					pointerEvents: 'none',
				},
				top: vnode.attrs.top,
				left: vnode.attrs.left
			}, vnode.children)
		}
	}
}

module.exports = Tooltip