/*global
define
*/
define([
	'codemirror',
	'jsonlint',
	'js-beautify',
	'lib/minify.json',
	'javascript-syntax'
],
function(CodeMirror, jsonlint, beautify, minify) {
	'use strict';
	var doc = document,
		App = function App() {
			var form = this.form = doc.forms.main,
				codeInput = form.code,
				query = this.query = parseQuery(),
				faq = doc.getElementById('faq'),
				editor;



			editor = this.editor = CodeMirror.fromTextArea(codeInput, {
				lineNumbers: true,
				styleActiveLine: true,
				matchBrackets: true
			});


			Object.defineProperty(this, 'code', {
				get: function() {
					return codeInput.value;
				},
				set: function(v) {
					codeInput.value = v;
					editor.setValue(v);
				}
			});

			this.form.addEventListener('submit', function(evt) {
				evt.preventDefault();
				this.go();
			}.bind(this));

			doc.getElementById('faqButton').addEventListener('click', function(evt) {
				evt.preventDefault();
				faq.classList.toggle('expand');
			});

			if (query.json) {
				this.code = query.json;
				this.go();
			}
		},
		fn = App.prototype;

	fn.go = function() {
		if (this.code.indexOf('http') === 0) {
			this.fetch(this.code, function(resp) {
				this.validate(resp);
			}, function(err) {
				this.notify(false, err);
			});
		} else {
			this.validate();
		}
	};

	fn.comb = function(code) {
		code = typeof code == 'undefined' ? this.code : code;

		if (this.query.reformat == 'no') {
			code = code;
		} else if (this.query.reformat == 'compress') {
			code = minify(code) || code;
		} else {
			code = beautify.js_beautify(code);
		}

		return this.code = code;
	};


	fn.validate = function(code) {
		code = this.comb(code);

		try {
			jsonlint.parse(code);
			this.notify(true, 'Valid JSON');
		} catch (e) {
			this.notify(false, e);
		}
	};

	fn.notify = function(success, text) {
		var result = doc.getElementById('result');
		doc.getElementById('result-container').classList.add('shown');
		// ie10 doesn't support 2nd argument in classList.toggle
		result.classList[success ? 'add' : 'remove']('success');
		result.classList[!success ? 'add' : 'remove']('error');
		result.innerHTML = text;
	};

	fn.fetch = function(url, success, error) {
		var req = new XMLHttpRequest();
		req.onreadystatechange = function() {
			if (req.readyState === XMLHttpRequest.DONE) {
				if (req.status === 200) {
					success && success.call(this, req.responseText);
				} else {
					error && error.call(this, req.statusText || 'Fetch error');
				}
			}
		}.bind(this);

		req.open('GET', url);
		req.send('url=' + encodeURIComponent(url));
	};


	function parseQuery() {
		var search = location.search,
			query = {},
			a = search.substr(1).split('&'),
			i, b;

		if (!search) {
			return query;
		}

		for (i = 0; i < a.length; i++) {
			b = a[i].split('=');
			query[decodeURIComponent(b[0])] = decodeURIComponent(b[1] || '');
		}

		return query;
	}

	return window.app = new App();
});
