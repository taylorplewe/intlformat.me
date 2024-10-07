<script lang="ts">
import Formatter from './lib/formatter';
import OPTIONS from './lib/options';

const formatter = new Formatter();

let locale = formatter.locale;
let dateString = formatter.dateString;
const onLocaleSubmit = (e: Event): void => {
	if ('key' in e) {
		e.key === 'Enter' && (e.target as HTMLElement)?.blur();
		return;
	}
	formatter.locale = locale;
	locale = formatter.locale;
}
const onDateSubmit = (e: Event): void => {
	if ('key' in e) {
		e.key === 'Enter' && (e.target as HTMLElement)?.blur();
		return;
	}
	formatter.dateString = dateString;
	dateString = formatter.dateString;
}
const onOptionSubmit = (e: Event, key: string): void => {
	if ('key' in e) {
		e.key === 'Enter' && (e.target as HTMLElement)?.blur();
		return;
	}
	formatter.setOption(key, (e.target as HTMLInputElement).value);
}

const selectInputEl =
	({ target }: { target: EventTarget | null }): void =>
		(target as HTMLInputElement)?.select();

const selectOption = (e: Event, key: string): void => {
	const { value } = e.target as HTMLSelectElement;
	formatter.setOption(key, value);
	formatter.dateString = dateString; // trigger re-render
}
</script>

<main>
  <div id="preview">
    <article class="overflow-auto">
      <h1>code</h1>
      <pre>
<code id="expression">{formatter.expressionText}</code>
      </pre>
    </article>
    <article class="flex-grow">
      <div id="output-header"><h1>output</h1></div>
      <div id="output-container">
        <code id="output">{formatter.outputText}</code>
      </div>
    </article>
  </div>
  <div id="controls">
    <article id="date-section">
	  <div class="labelled-input--full">
		<h1>date</h1>
		<input
		  bind:value={dateString}
		  on:blur={onDateSubmit}
		  on:keydown={onDateSubmit}
		  on:focus={selectInputEl}
		/>
	  </div>
      {#if formatter.errorMessages.date}
        <p class="error-message">{formatter.errorMessages.date}</p>
      {/if}
    </article>
    <article>
	  <div class="labelled-input--full">
		<h1>locale</h1>
		<input
		  bind:value={locale}
		  on:blur={onLocaleSubmit}
		  on:keydown={onLocaleSubmit}
		  on:focus={selectInputEl}
		/>
	  </div>
      {#if formatter.errorMessages.locale}
        <p class="error-message">{formatter.errorMessages.locale}</p>
      {/if}
    </article>
    <article id="options" class="flex-grow overflow-auto">
      <h1>options</h1>
      <div id="options-list">
		{#each Object.entries(OPTIONS.dates) as [, options]}
		  {#each Object.entries(options) as [key, values]}
		    <div class="labelled-input">
			  <label for={`option-${key}`}>{key}</label>
			  {#if Array.isArray(values)}
			    <select
				  value={formatter.options[key] || 'undefined'}
				  id={`option-${key}`}
				  class="input"
				  on:change={e => selectOption(e, key)}
				>
				  {#each values as value}
				    <option value={value}>{value}</option>
				  {/each}
			    </select>
			  {:else}
			    <input
				  value={formatter.options[key]}
				  type="text"
				  id={`option-${key}`}
				  on:blur={e => onOptionSubmit(e, key)}
				  on:keydown={e => onOptionSubmit(e, key)}
				  on:focus={selectInputEl}
				/>
			  {/if}
		    </div>
		  {/each}
		  <hr />
		{/each}
      </div>
    </article>
  </div>
</main>
<footer>
  Taylor Plewe, 2024 -&nbsp;<a href="https://github.com/taylorplewe/intlformat.me" target="_blank">GitHub repo</a>
</footer>

<style>
:root {
	--col-bg: #222;
	--col-subsection: #2b2b2b;
	--col-input-bg: #333;
	--col-input-bg-hover: #444;
	--col-text-light: #eee;
	--col-text-mid: #aaa;
	--col-text-faint: #777;
	--col-border-light: #eee;
	--col-fg-invalid: #b44;
	--col-bg-invalid: #533;
}

body {
	background-color: var(--col-bg);
	font-family: 'Red Hat Mono', monospace;
	color: var(--col-text-light);
	margin: 0;
	overflow: hidden;
}
main {
	height: calc(100vh - 16px);
	box-sizing: border-box;
	padding: 16px 16px 0 16px;
	display: grid;
	grid-template-columns: 60% auto;
	gap: 16px;
}
footer {
	margin-right: 16px;
	height: 16px;
	color: var(--col-text-faint);
	display: flex;
	justify-content: flex-end;
}
footer a {
	color: var(--col-text-mid);
}
article {
	background-color: var(--col-subsection);
	border-radius: 16px;
	padding: 24px;
	display: flex;
	flex-direction: column;
	gap: 8px;
	overflow: visible;
	position: relative;
}
article.overflow-auto {
	overflow: auto;
}
h1, pre, p {
	margin: 0;
}
h1 {
	color: var(--col-text-faint);
	font-size: 1.5em;
}
code {
	font-size: 16pt;
}
select, input {
	border: none;
	color: var(--col-text-light);
	font-size: 16pt;
	font-family: 'Red Hat Mono', monospace;
	background-color: var(--col-input-bg);
	padding: 8px;
	border-radius: 8px;
	transition: background-color 0.2s ease;
	box-sizing: border-box;
	min-height: 46px;
}
select {
	cursor: pointer;
}
hr {
	border: 0;
	border-top: 1px solid var(--col-text-faint);
	width: 100%;
	margin: 24px 0 24px 0;
}
input:hover {
	background-color: var(--col-input-bg-hover);
}
input:focus {
    box-shadow: inset 0 0 1px var(--col-border-light);
	background: transparent;
}
input:not(:focus)[invalid] {
	background-color: var(--col-bg-invalid);
}
input[type="radio"] {
	appearance: none;
}

.slider-radio {
	display: flex;
	align-items: baseline;
}
.slider-radio > input[type="radio"] {
	padding-inline: 32px;
	cursor: pointer;
	background-color: transparent;
}
.slider-radio > input[type="radio"]:checked {
	background-color: var(--col-input-bg);
}
.slider-radio > input[type="radio"]:hover {
	background-color: var(--col-input-bg-hover);
}
.slider-radio > input[type="radio"]::after {
	content: attr(value);
}
.flex-grow {
	flex-grow: 1;
}
.labelled-input {
	display: flex;
	justify-content: space-between;
	align-items: baseline;
	max-width: 512px;
}
.labelled-input :is(input, select) {
	width: min(256px, 100%);
}
.labelled-input--full {
	display: flex;
    justify-content: space-between;
    align-items: baseline;
    gap: 16px;
    flex-wrap: wrap;
}
.labelled-input--full :nth-child(2) {
	flex-grow: 1;
    max-width: 512px;
}
.error-message {
	color: var(--col-fg-invalid);
}

#code-mode-container {
	display: flex;
	gap: 16px;
}
#expression {
	color: var(--col-text-faint);
}
#output {
	font-size: 42pt;
	color: var(--col-text-light);
}
#output[shrink] {
	font-size: 32pt;
}
#output-header {
	position: absolute;
}
#output-container {
	display: flex;
	flex-grow: 1;
	align-items: center;
	justify-content: center;
}

#preview {
	display: grid;
	/* grid-template-rows: auto 1fr 1fr; */
	grid-template-rows: 1fr 1fr;
	gap: 16px;
	overflow: auto;
}
#mode-section {
	flex-direction: row;
	gap: 16px;
	align-items: baseline;
}
#controls {
	display: flex;
	flex-direction: column;
	gap: 16px;
	overflow: auto;
}
#options label {
	font-size: 14pt;
	color: var(--col-text-faint);
}
#options-list {
	display: flex;
	flex-direction: column;
	gap: 8px;
	overflow: auto;
}
#options-list .text-input[empty]::after {
	font-style: italic;
	opacity: .4;
	content: 'enter text...';
}

@media screen and (max-width: 1200px) {
	body {
		overflow: initial;
	}
	main {
		height: initial;
		grid-template-columns: auto;
	}
	footer {
		justify-content: center;
		margin-top: 8px;
		padding-bottom: 64px;
	}
	select, input {
		width: 100%;
	}
	#preview {
		grid-template-rows: auto;
	}
	#output {
		font-size: 24pt;
	}
	#output[shrink] {
		font-size: 18pt;
	}
	.labelled-input {
		flex-direction: column;
	}
}
</style>
