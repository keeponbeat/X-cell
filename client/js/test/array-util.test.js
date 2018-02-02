const { getRange, getLetterRange } = require('../array-util');

describe('array-util', () => {

	describe('getRange()', () => {
		it('produces a valid range starting with 0', () => {
			expect(getRange(0, 5)).toEqual([0, 1, 2, 3, 4, 5]);
		});
		it('produces a valid range starting with 1', () => {
			expect(getRange(1, 5)).toEqual([1, 2, 3, 4, 5]);
		});
		it('produces a valid range with negative numbers', () => {
			expect(getRange(-10, -7)).toEqual([-10, -9, -8, -7]);
		});
		it('produces a valid range starting negative number and end with positive number', () => {
			expect(getRange(-10, 2)).toEqual([-10, -9, -8, -7, -6, -5, -4, -3, -2, -1, 0, 1, 2]);
		});
	});

	describe('getLetterRange()', () => {
		it('produces a valid range starting with Q', () => {
			expect(getLetterRange('Q', 1)).toEqual(['Q']);
		});
		it('produces a valid range starting with A', () => {
			expect(getLetterRange('A', 5)).toEqual(['A', 'B', 'C', 'D', 'E']);
		});
		it('pproduces a valid range starting with C', () => {
			expect(getLetterRange('C', 3)).toEqual(['C', 'D', 'E']);
		});
	});

});

