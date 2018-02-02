const { removeChildren, createTR, createTH, createTD } = require('../dom-util');

describe('dom-util', () => {
	
	describe('DOM creation functions', () => {
		describe('createTR()', () => {
			it('produces valid TR element', () => {
				const el = createTR();
				expect(el.tagName).toBe('TR');
			});
			it('produces valid TR element with textContent', () => {
				const text = 'Oh, this is TR element!';
				const el = createTR(text);
				expect(el.tagName).toBe('TR');
				expect(el.textContent).toBe('Oh, this is TR element!');
			});
		});
		describe('createTH()', () => {
			it('produces valid TH element', () => {
				const el = createTH();
				expect(el.tagName).toBe('TH');
			});
			it('produces valid TH element with textContent', () => {
				const text = 'Oh, this is TH element!';
				const el = createTH(text);
				expect(el.tagName).toBe('TH');
				expect(el.textContent).toBe('Oh, this is TH element!');
			});
		});
		describe('createTD()', () => {
			it('produces valid TD element', () => {
				const el = createTD();
				expect(el.tagName).toBe('TD');
			});
			it('produces valid TD element with textContent', () => {
				const text = 'Oh, this is TD element!';
				const el = createTD(text);
				expect(el.tagName).toBe('TD');
				expect(el.textContent).toBe('Oh, this is TD element!');
			});
		});
	});

	describe('removeChildren()', () => {
		it('removes one child', () => {
			// setup
			const parent = document.createElement('DIV');
			const child = document.createElement('STRONG');
			parent.appendChild(child);
			// inspect initial state
			expect(parent.childNodes.length).toBe(1);
			expect(parent.childNodes[0]).toBe(child);

			removeChildren(parent);
			// inspect result state
			expect(parent.childNodes.length).toBe(0);
		});
		it('removes ten childs', () => {
			// setup
			const parent = document.createElement('DIV');
			const child1 = document.createElement('STRONG');
			const child2 = document.createElement('STRONG');
			const child3 = document.createElement('STRONG');
			const child4 = document.createElement('STRONG');
			const child5 = document.createElement('STRONG');
			const child6 = document.createElement('STRONG');
			const child7 = document.createElement('STRONG');
			const child8 = document.createElement('STRONG');
			const child9 = document.createElement('STRONG');
			const child10 = document.createElement('STRONG');
			parent.appendChild(child1);
			parent.appendChild(child2);
			parent.appendChild(child3);
			parent.appendChild(child4);
			parent.appendChild(child5);
			parent.appendChild(child6);
			parent.appendChild(child7);
			parent.appendChild(child8);
			parent.appendChild(child9);
			parent.appendChild(child10);
			// inspect initial state
			expect(parent.childNodes.length).toBe(10);
			expect(parent.childNodes[0]).toBe(child1);

			removeChildren(parent);
			// inspect result state
			expect(parent.childNodes.length).toBe(0);
		});
	});

});