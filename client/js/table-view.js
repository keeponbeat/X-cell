const { getLetterRange } = require('./array-util');
const { removeChildren, createTH } = require('./dom-util');

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
	}

	renderTable(){
		this.renderTableHeader();
	}

	renderTableHeader(){
		removeChildren(this.headerRowEl);
		getLetterRange('A', this.model.numCols)
			.map(colName => createTH(colName))
			.forEach(th => this.headerRowEl.appendChild(th));
	}
}

module.exports = TableView;