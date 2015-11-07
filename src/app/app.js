import CodeMirror from 'codemirror';
import _js from 'javascript-syntax';
import jsonlint from 'jsonlint';
import {js_beautify as beautify} from 'js-beautify';
//
let doc = document;

window.app = new class Main {
	constructor() {
		let form = doc.forms.main,
			code = form.code;

		var editor = CodeMirror.fromTextArea(document.getElementById("code"), {
			lineNumbers: true,
			styleActiveLine: true,
			matchBrackets: true
		});

		form.addEventListener('submit', evt => {
			evt.preventDefault();
			editor.setValue(beautify(code.value));
			try {
				jsonlint.parse(code.value);
				this.notify(true, 'Valid JSON');
			} catch(e) {
				this.notify(false, e);
			}
		});


	}

	notify(success, text) {
		let result = doc.querySelector('#result');
		result.classList.toggle('success', success);
		result.classList.toggle('error', !success);
		result.innerHTML = text;
	}
}
