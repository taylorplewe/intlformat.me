const TAB = '  ';
const LITERAL_MAP = {
	'undefined': undefined,
	'null': null,
	'true': true,
	'false': false,
};
const QUOTE_SURROUNDING_TEXT_REGEX = /^['"`](.*)['"`]$/;
const ALL_DIGITS_REGEX = /^\d+$/;
import OPTIONS from './options.js';

export default class Formatter {
	constructor(els) {
		this._els = els;
		this._formatter = new Intl.DateTimeFormat();
		this._locale = undefined;
		this._dateInput = '07/02/1997';
		this._errorMessages = {
			locale: '',
			date: '',
		};
	}

	set locale(val) {
		this._locale = this._getProcessedValue(val.toLowerCase());
		try {
			this._errorMessages.locale = '';
			console.log('trying locale');
			this._formatter = new Intl.DateTimeFormat(this._locale, this.options);
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
		return this._formatter.resolvedOptions();
	}
	get optionsText() {
		return Object.entries(this.options)
			.filter(o => this._showOption(o))
			.map(o => `${o[0]}: ${this._getProcessedOutputString(o[1])}`)
			.join(`,\n${TAB}${TAB}`);
	}
	get expressionText() {
		const localeText = this._getProcessedOutputString(this._locale);
		const dateText = this._getProcessedOutputString(this._dateInput);
		const secondParamText = this.optionsText.length ? `,\n${TAB}{\n${TAB}${TAB}${this.optionsText}\n${TAB}}` : '';
		return `Intl.DateTimeFormat(\n${TAB}${localeText}${secondParamText}\n).format(new Date(${dateText}));`;
	}
	get outputText() {
		let output = '';
		try {
			this._errorMessages.date = '';
			let date;
			switch (typeof this._dateInput) {
				case 'string':
					date = this._dateInput ? new Date(this._dateInput) : new Date();
					break;
				default:
					date = new Date(this._dateInput);
			}
			output = this._formatter.format(date);
		} catch ({ message }) {
			this._errorMessages.date = message;
		}
		return Object.values(this._errorMessages).some(m => m.length) ? '😢' : output;
	}

	setOption(option, val) {
		this._formatter = new Intl.DateTimeFormat(this._locale, { ...structuredClone(this.options), [option]: this._getProcessedValue(val) });
		this.updateEls();
	}
	updateEls() {
		this._els.dateErrorEl.style.display = 'none';
		this._els.localeErrorEl.style.display = 'none';
		this._els.dateEl.removeAttribute('invalid');
		this._els.localeEl.removeAttribute('invalid');

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
		if (this._errorMessages.locale) {
			this._els.localeEl.setAttribute('invalid', '');
			this._els.localeErrorEl.style.display = 'block';
			this._els.localeErrorEl.textContent = this._errorMessages.locale;
		}

		// update date & locale
		this._els.dateEl.value = this._getProcessedOutputString(this._dateInput);
		this._els.localeEl.value = this._getProcessedOutputString(this._locale);

		// update all option values
		for (const el of this._els.optionsListEl.querySelectorAll('select, input')) {
			const prop = el.id.replace('option-', '');
			el.value = this.options[prop];
		}
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
				const otherOptionsAreSet = Object.entries(OPTIONS.dateTimeComponents)
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
		console.trace();
		let match = val.match(QUOTE_SURROUNDING_TEXT_REGEX);
		if (match) return match[1];
		if (ALL_DIGITS_REGEX.test(val)) return parseInt(val);
		return val in LITERAL_MAP ? LITERAL_MAP[val] : val;
	}
	_getProcessedOutputString(val) {
		return typeof val !== 'string' || !val.length ? `${val}` : `'${val}'`;
	}
}