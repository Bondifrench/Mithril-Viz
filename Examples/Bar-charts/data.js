function getRandomIntInclusive(min, max) {
  min = Math.ceil(min) || 0;
  max = Math.floor(max) || 100;
  return Math.floor(Math.random() * (max - min + 1)) + min; //The maximum is inclusive and the minimum is inclusive 
}


function range(size, min, max) {
	return Array.apply(null, Array(size)).map(()=>getRandomIntInclusive(min, max));
}

module.exports = range;