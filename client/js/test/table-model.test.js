const TableModel = require('../table-model');

describe('table-model', () => {
	
	describe('_getCellId', () => {
		it('returns collect value', () => {
			var model = new TableModel();
			var location = {col: 3, row: 1};
			expect(model._getCellId(location)).toEqual("3:1");
			var location = {col: 10, row: 20};
			expect(model._getCellId(location)).toEqual("10:20");
		});
	});

	describe('getValue', () => {
		it('returns undefined when not set value', () => {
			var model = new TableModel();
			var location = {col: 3, row: 1};
			expect(model.getValue(location)).toBe(undefined);
		});
	});

	describe('setValue', () => {
		it('can set string value collectry', () => {
			var model = new TableModel();
			var location = {col: 10, row: 5};
			model.setValue(location, 'Tom');
			expect(model.getValue(location)).toEqual('Tom');
		});
		it('can set number value collectry', () => {
			var model = new TableModel();
			var location = {col: 10, row: 5};
			model.setValue(location,100);
			expect(model.getValue(location)).toEqual(100);
		});
	});

});