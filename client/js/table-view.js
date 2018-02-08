const { getLetterRange } = require('./array-util');
const { removeChildren, createTH, createTR, createTD } = require('./dom-util');

class TableView {


	constructor(model){
		this.model = model;
	}

	init() {
		this.initDomReferences();
		this.renderTable();
	}

	initDomReferences(){
		this.headerRowEl = document.querySelector('thead tr');
		this.sheetBodyEl = document.querySelector('tbody');
	}

	renderTable(){
		this.model.setValue({row:1, col:2}, 10);
		this.renderTableHeader();
		this.renderTableBody();
	}

	renderTableHeader(){
		removeChildren(this.headerRowEl);
		getLetterRange('A', this.model.numCols)
			.map(colName => createTH(colName))
			.forEach(th => this.headerRowEl.appendChild(th));
	}

	renderTableBody(){
		const fragment = document.createDocumentFragment();
		for (let row = 0; row < this.model.numRows; row++) {
			const tr = createTR();
			for (let col = 0; col < this.model.numCols; col++) {
				const td = createTD(this.model.getValue({col:col,row:row}));
				tr.appendChild(td);
			}
			fragment.appendChild(tr);
		}
		removeChildren(this.sheetBodyEl);
		this.sheetBodyEl.appendChild(fragment);
	}
}

module.exports = TableView;