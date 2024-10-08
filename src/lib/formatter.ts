const TAB = '  ';
const QUOTE_SURROUNDING_TEXT_REGEX = /^['"`](.*)['"`]$/;
import OPTIONS from './options';

export default class Formatter {
    _formatter: Intl.DateTimeFormat;
    _locale: string | null | undefined | object;
    _dateInput: string | null | undefined | object;
	_dateIsEmpty: boolean;
    _errorMessages: { locale: string; date: string; };

	constructor() {
		this._formatter = new Intl.DateTimeFormat();
		this._locale = undefined;
		this._dateInput = '07/02/1997';
		this._dateIsEmpty = false;
		this._errorMessages = {
			locale: '',
			date: '',
		};
	}

    get locale(): string {
        return this._getProcessedOutputString(this._locale);
    }
	set locale(val: string) {
		this._locale = this._getProcessedValue(val);
		try {
			this._errorMessages.locale = '';
			this._formatter = new Intl.DateTimeFormat(this._locale, this.options);
		} catch ({ message }: any) {
			this._errorMessages.locale = message;
		}
	}
	set dateString(val: string) {
		this._dateIsEmpty = val === '';
		this._dateInput = this._getProcessedValue(val);
	}
	get dateString(): string {
		return this._dateIsEmpty ? '' : this._getProcessedOutputString(this._dateInput);
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
		const secondParamText = this.optionsText.length ? `,\n${TAB}{\n${TAB}${TAB}${this.optionsText}\n${TAB}}` : '';
		return `Intl.DateTimeFormat(\n${TAB}${this.locale}${secondParamText}\n).format(new Date(${this.dateString}));`;
	}
	get outputText(): string {
		let output = '';
		try {
			this._errorMessages.date = '';
			let date = this._dateIsEmpty ? new Date() : new Date(this._dateInput);
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
	_getProcessedValue(val: string): any  {
		try {
			return JSON.parse(val);
		} catch {
			let match = val.match(QUOTE_SURROUNDING_TEXT_REGEX);
			if (match) return match[1];
			return val === 'undefined' ? undefined : val;
		}
	}
	_getProcessedOutputString(val: any): string {
		return val === undefined ? 'undefined' : JSON.stringify(val);
	}
}