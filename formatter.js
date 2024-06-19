export default class Formatter {
	constructor(expressionEl, outputEl) {
		this.expressionEl = expressionEl;
		this.outputEl = outputEl;

		this._locale = 'en-US';
		this._options = {
			weekday: 'long',
			month: 'short',
		};
		this.dateString = '07/02/1997';
	}

	get optionsText() {
		return Object.entries(this._options).map(o => `${o[0]}: '${o[1]}'`).join(', ');
	}

	get expressionText() {
		const secondParamText = this.optionsText.length ? `, { ${this.optionsText} }` : '';
		return `Intl.DateTimeFormat('${this._locale}'${secondParamText}).format(new Date(${this.dateString.length ? `'${this.dateString}'` : ''}));`;
	}

	get outputText() {
		return Intl.DateTimeFormat(this._locale, this._options).format(new Date(this.dateString || null));
	}

	get locale() {
		return this._locale;
	}
	set locale(val) {
		this.updateEls();
	}
	get options() {
		return this._options;
	}
	set options(val) {
		this.updateEls();
	}

	updateEls() {
		this.expressionEl.textContent = this.expressionText;
		this.outputEl.textContent = this.outputText;
	}
}