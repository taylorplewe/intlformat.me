const TAB = '  ';
const LITERAL_MAP = {
	'undefined': undefined,
	'null': null,
	'true': true,
	'false': false,
};
const QUOTE_SURROUNDING_TEXT_REGEX = /^['"`](.*)['"`]$/;
const ALL_DIGITS_REGEX = /^\d+$/;
const nextTick = async () => new Promise(resolve => setTimeout(() => resolve(), 0));
import OPTIONS from './options.js';

export default class Formatter {
	constructor(els) {
		this._els = els;

		this._mode = 'dates';
		this._numberFormatter = new Intl.NumberFormat();
		this._dateFormatter = new Intl.DateTimeFormat();
		this._locale = undefined;
		this._dateInput = '07/02/1997';
		this._numberInput = 1_000_000.5;
		this._errorMessages = {
			locale: '',
			date: '',
		};
	}

	set mode(val) {
		this._mode = val;
		this.updateEls();
	}

	set locale(val) {
		this._locale = this._getProcessedValue(val);
		try {
			this._errorMessages.locale = '';
			this._dateFormatter = new Intl.DateTimeFormat(this._locale, this.options);
		} catch ({ message }) {
			this._errorMessages.locale = message;
		}
		this.updateEls();
	}
	set dateString(val) {
		this._dateInput = this._getProcessedValue(val.toLowerCase());
		this.updateEls();
	}

	get options() {
		return this._mode === 'dates'
			? this._dateFormatter.resolvedOptions()
			: this._numberFormatter.resolvedOptions();
	}
	get optionsText() {
		return Object.entries(this.options)
			.filter(o => this._showOption(o))
			.map(o => `${o[0]}: ${this._getProcessedOutputString(o[1])}`)
			.join(`,\n${TAB}${TAB}`);
	}
	get expressionText() {
		const localeText = this._getProcessedOutputString(this._locale);
		const inputText = this._getProcessedOutputString(this._mode === 'dates' ? this._dateInput : this._numberInput);
		const secondParamText = this.optionsText.length ? `,\n${TAB}{\n${TAB}${TAB}${this.optionsText}\n${TAB}}` : '';
		if (this._mode === 'dates') {
			return `Intl.DateTimeFormat(\n${TAB}${localeText}${secondParamText}\n).format(new Date(${inputText}));`;
		} else {
			return `Intl.NumberFormat(\n${TAB}${localeText}${secondParamText}\n).format(${inputText});`;
		}
	}
	get outputText() {
		let output = '';
		try {
			this._errorMessages.date = '';
			this._errorMessages.number = '';
			if (this._mode === 'dates') {
				let date;
				switch (typeof this._dateInput) {
					case 'string':
						date = this._dateInput ? new Date(this._dateInput) : new Date();
						break;
					default:
						date = new Date(this._dateInput);
				}
				output = this._dateFormatter.format(date);
			} else {
				output = this._numberFormatter.format(this._numberInput);
			}
		} catch ({ message }) {
			this._mode === 'dates'
				? this._errorMessages.date = message
				: this._errorMessages.number = message;
		}
		return Object.values(this._errorMessages).some(m => m.length) ? '😢' : output;
	}

	setOption(option, val) {
		if (this._mode === 'dates') {
			this._dateFormatter = new Intl.DateTimeFormat(this._locale, { ...structuredClone(this.options), [option]: this._getProcessedValue(val) });
		} else {
			console.log('option, val', option, this._getProcessedValue(val));
			this._numberFormatter = new Intl.NumberFormat(this._locale, { ...structuredClone(this.options), [option]: this._getProcessedValue(val) });
		}
		this.updateEls();
	}
	async updateEls() {
		// reset errors
		this._els.dateErrorEl.style.display = 'none';
		this._els.localeErrorEl.style.display = 'none';
		this._els.dateEl.removeAttribute('invalid');
		this._els.localeEl.removeAttribute('invalid');

		// mode
		const selectedModeEl = this._els.modeSliderEl.querySelector(`[value="${this._mode}"]`);
		selectedModeEl.checked = true;
		switch (this._mode) {
			case 'dates':
			default:
				this._els.dateSectionEl.style.display = 'initial';
				this._els.numberSectionEl.style.display = 'none';
				break;
			case 'numbers':
				this._els.dateSectionEl.style.display = 'none';
				this._els.numberSectionEl.style.display = 'initial';
				break;
		}

		this._updateOptionEls();
		await nextTick();

		this._els.expressionEl.textContent = this.expressionText;
		this._els.outputEl.textContent = this.outputText;
		this._els.outputEl.removeAttribute('shrink');
		if (this._els.outputEl.getBoundingClientRect().width > this._els.outputEl.parentNode.getBoundingClientRect().width * 0.75) this._els.outputEl.setAttribute('shrink', '');

		// error handling
		if (this._errorMessages.date) {
			this._els.dateEl.setAttribute('invalid', '');
			this._els.dateErrorEl.style.display = 'block';
			this._els.dateErrorEl.textContent = this._errorMessages.date;
		}
		if (this._errorMessages.number) {
			this._els.numberEl.setAttribute('invalid', '');
			this._els.numberErrorEl.style.display = 'block';
			this._els.numberErrorEl.textContent = this._errorMessages.number;
		}
		if (this._errorMessages.locale) {
			this._els.localeEl.setAttribute('invalid', '');
			this._els.localeErrorEl.style.display = 'block';
			this._els.localeErrorEl.textContent = this._errorMessages.locale;
		}

		// update date & locale
		this._els.dateEl.value = this._getProcessedOutputString(this._dateInput);
		this._els.numberEl.value = this._getProcessedOutputString(this._numberInput);
		this._els.localeEl.value = this._getProcessedOutputString(this._locale);

		// update all option values
		for (const el of this._els.optionsListEl.querySelectorAll('select, input')) {
			const prop = el.id.replace('option-', '');
			el.value = this.options[prop];
		}

		this._makeInputsReactive();
	}
	_updateOptionEls() {
		// create the right option elements
		this._els.optionsListEl.replaceChildren();
		let i = 0;
		for (const category of Object.entries(OPTIONS[this._mode])) {
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
							this.setOption(entry[0], e.target.value);
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
				this._els.optionsListEl.appendChild(inputEl);
			}
			i++;
			if (i < Object.keys(OPTIONS['dates']).length) {
				this._els.optionsListEl.appendChild(document.createElement('hr'));
			}
		}

		// now set their values to the formatter's options
		for (const el of this._els.optionsListEl.querySelectorAll('select, input')) {
			const prop = el.id.replace('option-', '');
			el.value = this.options[prop];
		}
	}
	_makeInputsReactive() {
		for (const el of document.querySelectorAll('input')) {
			if (el.getAttributeNames().includes('reactive')) continue;
			const prop = el.getAttribute('prop');
			el.addEventListener('click', () => {
				el.select();
			});
			el.addEventListener('keydown', e => this._applyInput(e, prop, el));
			el.addEventListener('blur', e => this._applyInput(e, prop, el));
			el.setAttribute('reactive', '');
		}
	}
	_applyInput(e, prop, el) {
		if ('key' in e) {
			if (e.key === 'Enter') el.blur();
			return;
		}
	
		const match = el.id?.match(/option\-(.+)/);
		if (match) this.setOption(match[1], el.value);
		else this[prop] = el.value;
	}
	_showOption({ 0: optionName, 1: value }) {
		let defaultFormatterForLocale = {};
		try {
			defaultFormatterForLocale = new Intl.DateTimeFormat(this._locale).resolvedOptions();
		} catch {
			return false;
		}
		switch (optionName) {
			case 'month':
			case 'day':
			case 'year':
				const otherOptionsAreSet = Object.entries(OPTIONS['dates'].dateTimeComponents)
					.filter(e => !['month', 'year', 'day'].includes(e[0]))
					.some(e => this.options[e[0]] !== defaultFormatterForLocale[e[0]]);
				return this.options.month === defaultFormatterForLocale.month
					&& this.options.day === defaultFormatterForLocale.day
					&& this.options.year === defaultFormatterForLocale.year
					&& !otherOptionsAreSet
					? false : true;
			case 'locale':
				return false;
			case 'hour12':
				let defaultHourFormatterForLocale = {};
				try {
					defaultHourFormatterForLocale = new Intl.DateTimeFormat(this._locale, { hour: this.options.hour }).resolvedOptions();
					return this.options.hour12 !== defaultHourFormatterForLocale.hour12;
				} catch {
					return false;
				}
			case 'hourCycle':
				let defaultHour12FormatterForLocale = {};
				try {
					defaultHour12FormatterForLocale = new Intl.DateTimeFormat(this._locale, { hour: this.options.hour, hour12: this.options.hour12 }).resolvedOptions();
					return this.options.hourCycle !== defaultHour12FormatterForLocale.hourCycle;
				} catch {
					return false;
				}
			default:
				return value !== defaultFormatterForLocale[optionName];
		}
	}
	_getProcessedValue(val) {
		let match = val.match(QUOTE_SURROUNDING_TEXT_REGEX);
		if (match) return match[1];
		if (ALL_DIGITS_REGEX.test(val)) return parseInt(val);
		return val in LITERAL_MAP ? LITERAL_MAP[val] : val;
	}
	_getProcessedOutputString(val) {
		return typeof val !== 'string' || !val.length ? `${val}` : `'${val}'`;
	}
}
