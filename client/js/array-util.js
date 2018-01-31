const getRange = function(fromNum, toNum) {
	return Array.from(
		{length: toNum - fromNum + 1},
		(val, i) => fromNum + i
	);
}

module.exports = {
	getRange: getRange
};