const fs = require('fs');
const TableModel = require('../table-model');
const TableView = require('../table-view');

describe('table-view', () => {

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

		it('make th and td elements collectry', () => {
			const numCols = 6;
			const numRows = 10;
			const model = new TableModel(numCols, numRows);
			const view = new TableView(model);
			view.init();

			const ths = document.querySelectorAll('thead th');
			const trs = document.querySelectorAll('tbody tr');

			expect(ths.length).toEqual(numCols);
			expect(trs.length).toEqual(numRows);
			expect(Array.from(ths).map(el => el.textContent)).toEqual(["A","B","C","D","E","F"]);
		});

		it('displays cell values collectry', () => {
			const numCols = 6;
			const numRows = 10;
			const model = new TableModel(numCols, numRows);
			model.setValue({row:1, col:2}, 10);
			model.setValue({row:9, col:5}, 'val');
			const view = new TableView(model);
			view.init();

			const trs = document.querySelectorAll('tbody tr');
			expect(trs[1].cells[2].textContent).toEqual('10');
			expect(trs[9].cells[5].textContent).toEqual('val');
		});

		it('add class when cell clicked', () => {
			const numCols = 8;
			const numRows = 16;
			const model = new TableModel(numCols, numRows);
			const view = new TableView(model);
			view.init();

			let trs = document.querySelectorAll('tbody tr');
			expect(trs[2].cells[3].className).toBe('');
			trs[2].cells[3].click();

			trs = document.querySelectorAll('tbody tr');
			expect(trs[2].cells[3].className).not.toBe('');
		});
	});

});