const TAB = '  ';
const LITERAL_MAP: Record<string, undefined | null | boolean | Array<null>> = {
	'undefined': undefined,
	'null': null,
	'true': true,
	'false': false,
};
const QUOTE_SURROUNDING_TEXT_REGEX = /^['"`](.*)['"`]$/;
const ALL_DIGITS_REGEX = /^\d+$/;
import OPTIONS from './options.js';

export default class Formatter {
    _formatter: Intl.DateTimeFormat;
    _locale: string | undefined;
    _dateInput: string;
    _errorMessages: { locale: string; date: string; };

	constructor() {
		this._formatter = new Intl.DateTimeFormat();
		this._locale = undefined;
		this._dateInput = '07/02/1997';
		this._errorMessages = {
			locale: '',
			date: '',
		};
	}

    get locale(): string | undefined {
        return this._getProcessedOutputString(this._locale);
    }
	set locale(val: string) {
		this._locale = <string>this._getProcessedValue(val);
		try {
			this._errorMessages.locale = '';
			this._formatter = new Intl.DateTimeFormat(this._locale, this.options);
		} catch ({ message }: any) {
			this._errorMessages.locale = message;
		}
	}
	set dateString(val: string) {
		this._dateInput = <string>this._getProcessedValue(val.toLowerCase());
	}
	get dateString(): string {
		return this._getProcessedOutputString(this._dateInput);
	}

	get options(): Intl.DateTimeFormatOptions {
		return <Intl.DateTimeFormatOptions>this._formatter.resolvedOptions();
	}
	get optionsText(): string {
		return Object.entries(this.options)
			.filter(o => this._showOption(o))
			.map(o => `${o[0]}: ${this._getProcessedOutputString(o[1])}`)
			.join(`,\n${TAB}${TAB}`);
	}
	get expressionText(): string {
		const localeText = this._getProcessedOutputString(this._locale);
		const dateText = this._getProcessedOutputString(this._dateInput);
		const secondParamText = this.optionsText.length ? `,\n${TAB}{\n${TAB}${TAB}${this.optionsText}\n${TAB}}` : '';
		return `Intl.DateTimeFormat(\n${TAB}${localeText}${secondParamText}\n).format(new Date(${dateText}));`;
	}
	get outputText(): string {
		let output = '';
		try {
			this._errorMessages.date = '';
			let date: Date;
			switch (typeof this._dateInput) {
				case 'string':
					date = this._dateInput ? new Date(this._dateInput) : new Date();
					break;
				default:
					date = new Date(this._dateInput);
			}
			output = this._formatter.format(date);
		} catch ({ message }: any) {
			this._errorMessages.date = message;
		}
		return Object.values(this._errorMessages).some(m => m.length) ? '😢' : output;
	}
    get errorMessages(): { locale: string; date: string; } {
        return this._errorMessages;
    }

	setOption(option: string, val: string) {
		this._formatter = new Intl.DateTimeFormat(this._locale, { ...structuredClone(this.options), [option]: this._getProcessedValue(val) });
	}
	_showOption({ 0: optionName, 1: value }: { 0: string, 1: string}) {
		let defaultFormatterForLocale: Intl.ResolvedDateTimeFormatOptions;
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
				let defaultHourFormatterForLocale = <Intl.ResolvedDateTimeFormatOptions>{};
				try {
					defaultHourFormatterForLocale = new Intl.DateTimeFormat(this._locale, { hour: this.options.hour }).resolvedOptions();
					return this.options.hour12 !== defaultHourFormatterForLocale.hour12;
				} catch {
					return false;
				}
			case 'hourCycle':
				let defaultHour12FormatterForLocale = <Intl.ResolvedDateTimeFormatOptions>{};
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
	_getProcessedValue(val: string) {
		let match = val.match(QUOTE_SURROUNDING_TEXT_REGEX);
		if (match) return match[1];
		if (ALL_DIGITS_REGEX.test(val)) return parseInt(val);
		if (val.startsWith('[') || val.startsWith('{')) val = JSON.parse(val);
		return val in LITERAL_MAP ? LITERAL_MAP[val] : val;
	}
	_getProcessedOutputString(val: any): string {
		if (typeof val === 'object') return JSON.stringify(val);
		return typeof val !== 'string' || !val.length ? `${val}` : `'${val}'`;
	}
}