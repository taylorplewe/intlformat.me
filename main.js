import Formatter from './formatter.js';
import OPTIONS from './options.js';

const els = {
	expressionEl: document.querySelector('#expression'),
	outputEl: document.querySelector('#output'),
	dateEl: document.querySelector('#date'),
	localeEl: document.querySelector('#locale'),
	dateErrorEl: document.querySelector('#date-error'),
	localeErrorEl: document.querySelector('#locale-error'),
	optionsListEl: document.querySelector('#options-list'),
};

const formatter = new Formatter(els);

// create options elements
let i = 0;
for (const category of Object.entries(OPTIONS['dates'])) {
	for (const entry of Object.entries(category[1])) {
		const inputEl = document.createElement('div');
		const labelEl = document.createElement('label');
		inputEl.className = 'labelled-input';
		labelEl.textContent = entry[0];
		labelEl.setAttribute('for', `option-${entry[0]}`);
		inputEl.appendChild(labelEl);

		if (Array.isArray(entry[1])) {
			const selectEl = document.createElement('select');
			for (const option of entry[1]) {
				const optionEl = document.createElement('option');
				optionEl.textContent = option;
				selectEl.appendChild(optionEl);
				selectEl.className = 'input';
				selectEl.id = `option-${entry[0]}`;
				selectEl.addEventListener('change', e => {
					formatter.setOption(entry[0], e.target.value);
				});
				switch (option) {
					case 'true':
						optionEl.value = true;
						break;
					case 'false':
						optionEl.value = false;
						break;
					default:
						optionEl.value = option;
						break;
				}
			}
			inputEl.appendChild(selectEl);
		} else {
			const textInputEl = document.createElement('input');
			textInputEl.id = `option-${entry[0]}`;
			inputEl.appendChild(textInputEl);
		}
		els.optionsListEl.appendChild(inputEl);
	}
	i++;
	if (i < Object.keys(OPTIONS['dates']).length) {
		els.optionsListEl.appendChild(document.createElement('hr'));
	}
}

formatter.updateEls();

const applyInput = (e, prop, el) => {
	if ('key' in e) {
		if (e.key === 'Enter') el.blur();
		return;
	}

	const match = el.id?.match(/option\-(.+)/);
	if (match) formatter.setOption(match[1], el.value);
	else formatter[prop] = el.value;
}

for (const el of document.querySelectorAll('input')) {
	const prop = el.getAttribute('prop');
	el.addEventListener('focus', () => {
		el.select();
	});
	el.addEventListener('keydown', e => applyInput(e, prop, el));
	el.addEventListener('blur', e => applyInput(e, prop, el));
}