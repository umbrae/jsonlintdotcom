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

			editor.on('change', function() {
				this.highlightErrorLine(null);
			}.bind(this))




			Object.defineProperty(this, 'code', {
				get: function() {
					return editor.getValue();
				},
				set: function(v) {
					codeInput.value = v;
					editor.setValue(v);
				}
			});

			this.form.addEventListener('submit', function(evt) {
				evt.preventDefault();console.log(1, this.code);
				this.go();
			}.bind(this));

			doc.getElementById('faqButton').addEventListener('click', function(evt) {
				evt.preventDefault();
				faq.classList.toggle('expand');
			});

			doc.addEventListener('keyup', function(evt) {
				// Ctrl-Enter pressed
				if (evt.ctrlKey && evt.keyCode == 13) {
					this.go();
			  	}
			}.bind(this));

			[].slice.call(doc.querySelectorAll('[data-ga]')).forEach(function(node) {
				node.addEventListener('click', function() {console.log(node.getAttribute('data-ga'));
					ga('send', 'pageview', '/' + node.getAttribute('data-ga'));
				});
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
		console.log(code);
		try {
			jsonlint.parse(code);
			this.notify(true, 'Valid JSON');
		} catch (e) {
			var lineMatches = e.message.match(/line ([0-9]*)/);
			if (lineMatches && lineMatches.length > 1) {
				this.highlightErrorLine(+lineMatches[1]-1);
			}

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

	fn.highlightErrorLine = function(line) {console.log(line);
		if(typeof line == 'number') {
			this.errorLine = line;
			this.editor.addLineClass(line, 'background', 'line-error');
		} else if(typeof this.errorLine == 'number') {
			this.editor.removeLineClass(this.errorLine, 'background', 'line-error');
			this.errorLine = null;
		}
	}

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
