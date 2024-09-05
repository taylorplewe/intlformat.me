import Formatter from './formatter.js';

const els = {
	modeSliderEl: document.querySelector('#mode-slider'),
	expressionEl: document.querySelector('#expression'),
	outputEl: document.querySelector('#output'),
	dateEl: document.querySelector('#date'),
	numberEl: document.querySelector('#number'),
	dateSectionEl: document.querySelector('#date-section'),
	numberSectionEl: document.querySelector('#number-section'),
	localeEl: document.querySelector('#locale'),
	dateErrorEl: document.querySelector('#date-error'),
	numberErrorEl: document.querySelector('#number-error'),
	localeErrorEl: document.querySelector('#locale-error'),
	optionsListEl: document.querySelector('#options-list'),
};

const formatter = new Formatter(els);

// mode slider
const modeSliderInputs = els.modeSliderEl.querySelectorAll('input');
for (const el of modeSliderInputs) {
	el.addEventListener('change', ({ target: { value: mode } }) => formatter.mode = mode);
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