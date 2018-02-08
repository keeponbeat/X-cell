(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
const TableModel = require('./table-model');
const TableView = require('./table-view');

const model = new TableModel();
const view = new TableView(model);
view.init();

},{"./table-model":4,"./table-view":5}],2:[function(require,module,exports){
const getRange = function(fromNum, toNum) {
	return Array.from(
		{length: toNum - fromNum + 1},
		(val, i) => fromNum + i
	);
}

const getLetterRange = function(firstLetter = 'A', numLetters) {
	const rangeStart = firstLetter.charCodeAt(0);
	const rangeEnd = rangeStart + numLetters - 1;
	return getRange(rangeStart, rangeEnd)
		.map(charCode => String.fromCharCode(charCode));
}

module.exports = {
	getRange: getRange,
	getLetterRange: getLetterRange
};
},{}],3:[function(require,module,exports){
const removeChildren = function(parentEl) {
	while (parentEl.firstChild) {
		parentEl.removeChild(parentEl.firstChild);
	}
}

const createEl = function(tagName) {
	return function(text) {
		const el = document.createElement(tagName);
		if (text) {
			el.textContent = text;
		}
		return el;
	}
}

const createTR = createEl('TR');
const createTH = createEl('TH');
const createTD = createEl('TD');

module.exports = {
	removeChildren: removeChildren,
	createTR: createTR,
	createTH: createTH,
	createTD: createTD
}
},{}],4:[function(require,module,exports){
class TableModel {

	constructor(numCols = 10, numRows = 20){
		this.numCols = numCols;
		this.numRows = numRows;
		this.data = {};
	}

	_getCellId(location){
		return `${location.col}:${location.row}`;
	}

	getValue(location){
		return this.data[this._getCellId(location)];
	}

	setValue(location, value){
		this.data[this._getCellId(location)] = value;
	}
}

module.exports = TableModel;
},{}],5:[function(require,module,exports){
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
},{"./array-util":2,"./dom-util":3}]},{},[1]);
