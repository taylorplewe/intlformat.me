import Formatter from './formatter.js';
import OPTIONS from './options.js';

const els = {
	expressionEl: document.querySelector('#expression'),
	outputEl: document.querySelector('#output'),
};

const formatter = new Formatter(els);
formatter.updateEls();

// create options elements
const optionsListEl = document.querySelector('#options-list');
for (const entry of Object.entries(OPTIONS.dateTimeComponents)) {
	const inputEl = document.createElement('div');
	const labelEl = document.createElement('label');
	const selectEl = document.createElement('select');

	inputEl.className = 'labelled-input';
	labelEl.textContent = entry[0];
	for (const option of entry[1]) {
		const optionEl = document.createElement('option');
		optionEl.textContent = option;
		optionEl.value = option;
		selectEl.appendChild(optionEl);
	}
	selectEl.addEventListener('change', e => {
		formatter.options[entry[0]] = e.target.value;
		formatter.updateEls();
	});

	inputEl.appendChild(labelEl);
	inputEl.appendChild(selectEl);
	optionsListEl.appendChild(inputEl);
}

const applyInput = (e, prop, el) => {
	if ('key' in e && e.key !== 'Enter') return;
	el.removeAttribute('contenteditable');
	formatter[prop] = el.textContent;
	formatter.updateEls();
}
const selectContentEditable = el => {
    const range = document.createRange();
    const sel = window.getSelection();
    range.selectNodeContents(el);
    sel.removeAllRanges();
    sel.addRange(range);
}

const localeEl = document.querySelector('#locale');
localeEl.addEventListener('click', () => {
	if (!localeEl.hasAttribute('contenteditable')) {
		localeEl.setAttribute('contenteditable', '');
		selectContentEditable(localeEl);
	}
});
localeEl.addEventListener('keydown', e => applyInput(e, 'locale', localeEl));
localeEl.addEventListener('blur', e => applyInput(e, 'locale', localeEl));
localeEl.textContent = formatter.locale;

const dateEl = document.querySelector('#date');
dateEl.addEventListener('click', () => {
	dateEl.setAttribute('contenteditable', '');
	selectContentEditable(dateEl);
});
dateEl.addEventListener('keydown', e => applyInput(e, 'dateString', dateEl));
dateEl.addEventListener('blur', e => applyInput(e, 'dateString', dateEl));
dateEl.textContent = formatter.dateString;