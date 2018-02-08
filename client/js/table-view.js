const { getLetterRange } = require('./array-util');
const { removeChildren, createTH, createTR, createTD } = require('./dom-util');

class TableView {


	constructor(model){
		this.model = model;
	}

	init() {
		this.initDomReferences();
		this.initCurrentCell();
		this.renderTable();
		this.attachEventHandlers();
	}

	initDomReferences(){
		this.headerRowEl = document.querySelector('thead tr');
		this.sheetBodyEl = document.querySelector('tbody');
		this.formulaBarEl = document.querySelector('#formula-bar');
	}

	initCurrentCell() {
		this.currentCellLocation = {row:0, col:0};
		this.renderFormulaBar();
	}

	normalizeValue(val){
		return val || '';
	}

	renderFormulaBar(){
		const currentCellValue = this.model.getValue(this.currentCellLocation);
		this.formulaBarEl.value = this.normalizeValue(currentCellValue);
		this.formulaBarEl.focus();
	}

	renderTable(){
		//this.model.setValue({row:1, col:2}, 10);
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
				if (this.isCurrentCell(row, col)){
					td.className = "current-cell";
				};
				tr.appendChild(td);
			}
			fragment.appendChild(tr);
		}
		removeChildren(this.sheetBodyEl);
		this.sheetBodyEl.appendChild(fragment);
	}

	isCurrentCell(row, col) {
		return row === this.currentCellLocation.row &&
		       col === this.currentCellLocation.col;
	}

	attachEventHandlers(){
		this.sheetBodyEl.addEventListener('click', this.handleSheetClick.bind(this));
		this.formulaBarEl.addEventListener('keyup', this.handleFormulaBarChange.bind(this));
	}

	handleSheetClick(evt){
		//console.log(evt);
		const col = evt.target.cellIndex;
		const row = evt.target.parentElement.rowIndex - 1;
		this.currentCellLocation = {row:row, col:col};
		this.renderTableBody();
		this.renderFormulaBar();
	}

	handleFormulaBarChange(evt){
		const val = this.formulaBarEl.value;
		this.model.setValue(this.currentCellLocation, val);
		this.renderTableBody();
	}
}

module.exports = TableView;