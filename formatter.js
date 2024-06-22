import OPTIONS from './options.js';
const TAB = '  ';

export default class Formatter {
	constructor(els) {
		this._els = els;
		this._locale = undefined;
		this._formatter = new Intl.DateTimeFormat();
		this._dateString = '07/02/1997';
		this._errorMessages = {
			locale: '',
			date: '',
		};
		this.updateEls();
	}

	get optionsText() {
		return Object.entries(this._options)
			.filter(o => !!o[1])
			.map(o => `${o[0]}: '${o[1]}'`)
			.join(`,\n${TAB}${TAB}`);
	}

	get expressionText() {
		const secondParamText = this.optionsText.length ? `,\n${TAB}{\n${TAB}${TAB}${this.optionsText}\n${TAB}}` : '';
		const localeText = this._locale === undefined ? 'undefined' : `'${this._locale}'`;
		return `Intl.DateTimeFormat(\n${TAB}${localeText}${secondParamText}\n).format(new Date(${this.dateText}));`;
	}

	get processedDate() {
		switch (this._dateInput) {
			case '':
				return this.dateText[0] === `'` ? new Date('') : new Date();
			default:
				return new Date(this._dateInput);
		}
	}

	get processedLocale() {
		switch (this._locale) {
			case 'undefined':
				return undefined;
			default:
				return this._locale;
		}
	}

	get outputText() {
		let formatter, output = '';
		try {
			this.errorMessages.locale = '';
			formatter = Intl.DateTimeFormat(this.processedLocale, this._options);
		} catch ({ message }) {
			this.errorMessages.locale = message;
			return '😢';
		}
		try {
			this.errorMessages.date = '';
			output = formatter.format(this.processedDate);
		} catch ({ message }) {
			this.errorMessages.date = message;
			return '😢';
		}
		return output;
	}

	get locale() {
		return this._locale;
	}
	set locale(val) {
		this._locale = val;
		this.updateEls();
	}
	set dateString(val) {
		if (/^(\-)?\d+$/.test(val)) {
			this._dateInput = parseInt(val);
			this.dateText = val;
			return;
		}
		if (/^'.*'$/.test(val)) {
			this._dateInput = val.substring(1, val.length - 1);
			this.dateText = val;
			return;
		}
		if (val.length === 0) {
			this._dateInput = val;
			this.dateText = '';
			return;
		}
		if (val === 'null') {
			this._dateInput = null;
			this.dateText = 'null';
			return;
		}
		if (val === 'undefined') {
			this._dateInput = undefined;
			this.dateText = 'undefined';
			return;
		}
		this._dateInput = val;
		this.dateText = `'${val}'`;
	}
	get dateString() {
		return this._dateInput;
	}
	get options() {
		return this.formatter.resolvedOptions();
	}

	updateEls() {
		this.els.dateErrorEl.style.display = 'none';
		this.els.localeErrorEl.style.display = 'none';
		this.els.dateEl.removeAttribute('invalid');
		this.els.localeEl.removeAttribute('invalid');

		this.els.expressionEl.textContent = this.expressionText;
		this.els.outputEl.textContent = this.outputText;

		// error handling
		if (this.errorMessages.date) {
			this.els.dateEl.setAttribute('invalid', '');
			this.els.dateErrorEl.style.display = 'block';
			this.els.dateErrorEl.textContent = this.errorMessages.date;
		}
		if (this.errorMessages.locale.length) {
			this.els.localeEl.setAttribute('invalid', '');
			this.els.localeErrorEl.style.display = 'block';
			this.els.localeErrorEl.textContent = this.errorMessages.locale;
		}
	}
}