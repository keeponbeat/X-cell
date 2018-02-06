const fs = require('fs');
const TableModel = require('../table-model');
const TableView = require('../table-view');

describe('table-model', () => {

	beforeEach(function(){
		const content = fs.readFileSync('./client/js/test/fixtures/sheet-container.html', 'utf8');
		document.documentElement.innerHTML = content;
	});

	describe('init', () => {
		it('make th elements collectry', () => {
			const numCols = 8;
			const numRows = 16;
			const model = new TableModel(numCols, numRows);
			const view = new TableView(model);
			view.init();

			const ths = document.querySelectorAll('thead th');
			
			expect(ths.length).toEqual(numCols);
			expect(Array.from(ths).map(el => el.textContent)).toEqual(["A","B","C","D","E","F","G","H"]);
		});
	});

});