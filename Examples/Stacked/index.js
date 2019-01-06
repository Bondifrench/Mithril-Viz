var m = require('mithril');

var data = [{
	month: new Date(2015, 0, 1),
	apples: 3840,
	bananas: 1920,
	cherries: 960,
	dates: 400
}, {
	month: new Date(2015, 1, 1),
	apples: 1600,
	bananas: 1440,
	cherries: 960,
	dates: 400
}, {
	month: new Date(2015, 2, 1),
	apples: 640,
	bananas: 960,
	cherries: 640,
	dates: 400
}, {
	month: new Date(2015, 3, 1),
	apples: 320,
	bananas: 480,
	cherries: 640,
	dates: 400
}];
// resulting array:
[
  [[   0, 3840], [   0, 1600], [   0,  640], [   0,  320]], // apples
  [[3840, 5760], [1600, 3040], [ 640, 1600], [ 320,  800]], // bananas
  [[5760, 6720], [3040, 4000], [1600, 2240], [ 800, 1440]], // cherries
  [[6720, 7120], [4000, 4400], [2240, 2640], [1440, 1840]], // dates
]