var m = require('mithril');

function Group(vnode) {
	return {
		view: function (vnode) {
			return m('g', {
				transform: vnode.attrs.transform || `translate(${vnode.attrs.left}, ${vnode.attrs.top})`

			}, vnode.children)
		}
	}
}

module.exports = Group;