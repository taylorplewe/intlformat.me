import OPTIONS from './options.js';

export default class Formatter {
	constructor(els) {
		this.els = els;

		this._locale = 'en-US';
		this._options = {};
		for (const entry of Object.entries(OPTIONS.dateTimeComponents)) {
			this._options[entry[0]] = undefined;
			const _this = this;
			Object.defineProperty(this._options, entry[0], {
				set(val) {
					_this[entry[0]] = val === 'undefined' ? undefined : val;
					_this.updateEls();
				},
				get() {
					return _this[entry[0]];
				}
			});
		}
		this.dateString = '07/02/1997';
		this.updateEls();
	}

	get optionsText() {
		return Object.entries(this._options)
			.filter(o => !!o[1])
			.map(o => `${o[0]}: '${o[1]}'`)
			.join(',\n\t\t');
	}

	get expressionText() {
		const secondParamText = this.optionsText.length ? `,\n\t{\n\t\t${this.optionsText}\n\t}` : '';
		return `Intl.DateTimeFormat(\n\t'${this._locale}'${secondParamText}\n).format(new Date(${this.dateString.length ? `'${this.dateString}'` : ''}));`;
	}

	get outputText() {
		return Intl.DateTimeFormat(this._locale, this._options).format(new Date(this.dateString || null));
	}

	get locale() {
		return this._locale;
	}
	set locale(val) {
		this._locale = val;
		this.updateEls();
	}
	get options() {
		return this._options;
	}

	updateEls() {
		this.els.expressionEl.textContent = this.expressionText;
		this.els.outputEl.textContent = this.outputText;
	}
}