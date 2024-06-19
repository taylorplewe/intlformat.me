import Formatter from "./formatter.js";

const expressionEl = document.querySelector('#expression');
const outputEl = document.querySelector('#output');

const formatter = new Formatter(expressionEl, outputEl);
formatter.updateEls();