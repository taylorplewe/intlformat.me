<script lang="ts">
import { tick } from 'svelte';

import Formatter from './lib/formatter';
import OPTIONS from './lib/options';

const formatter = new Formatter();

let outputEl: HTMLElement | null = null;
let outputShrink: boolean = false;
$: formatter.outputText && updateOutputShrink();
const updateOutputShrink = async (): Promise<void> => {
	await tick();
	if (!outputEl || !outputEl.parentNode) return;
	outputShrink = outputEl.getBoundingClientRect().width > outputEl.parentNode.getBoundingClientRect().width * 0.75;
}

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
        <code id="output" bind:this={outputEl} class="{outputShrink ? 'shrink' : ''}">{formatter.outputText}</code>
      </div>
    </article>
  </div>
  <div id="controls">
    <article id="date-section">
	  <div class="labelled-input--full">
		<h1>date</h1>
		<input
		  class="{formatter.errorMessages.date ? 'invalid' : ''}"
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
		  class="{formatter.errorMessages.locale ? 'invalid' : ''}"
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
		{#each Object.entries(OPTIONS.dates) as [, options], index}
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
		  {#if index < Object.keys(OPTIONS.dates).length - 1}
		    <hr />
		  {/if}
		{/each}
      </div>
    </article>
  </div>
</main>
<footer>
  Taylor Plewe, 2024 -&nbsp;<a href="https://github.com/taylorplewe/intlformat.me" target="_blank">GitHub repo</a>
</footer>