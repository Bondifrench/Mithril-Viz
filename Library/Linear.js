/**
 * [Linear interpolation]
 * @param {[array]} a [equivalent to Domain in d3]
 * @param {[array]} b [equivalent to Range in d3]
 */
function Linear(a, b) {
	return function(x) {
		return b[0] + (b[1] - b[0]) * (x - a[0]) / (a[1] - a[0]);
	};
}

module.exports = Linear;