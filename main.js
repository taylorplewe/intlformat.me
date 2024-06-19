import Formatter from "./formatter.js";

const els = {
	expressionEl: document.querySelector('#expression'),
	outputEl: document.querySelector('#output'),
	localeEl: document.querySelector('#locale'),
};

const formatter = new Formatter(els);
formatter.updateEls();

const applyInput = (e, prop, el) => {
	if ('key' in e && e.key !== 'Enter') return;
	els[el].removeAttribute('contenteditable');
	formatter[prop] = els[el].textContent;
}
const selectContentEditable = el => {
    const range = document.createRange();
    const sel = window.getSelection();
    range.selectNodeContents(el);
    sel.removeAllRanges();
    sel.addRange(range);
}

els.localeEl.addEventListener('click', () => {
	els.localeEl.setAttribute('contenteditable', '');
	selectContentEditable(els.localeEl);
});
els.localeEl.addEventListener('keydown', e => applyInput(e, 'locale', 'localeEl'));
els.localeEl.addEventListener('blur', e => applyInput(e, 'locale', 'localeEl'));