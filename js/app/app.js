/*global
define, ga
*/
define([
	'codemirror',
	'jsonlint',
	'js-beautify',
	'lib/minify.json',
	'javascript-syntax',
	'lib/classlist-polyfill'
],
function(CodeMirror, jsonlint, beautify, minify) {
	'use strict';
	var doc = document,
		App = function App() {
			var form = this.form = doc.forms.main,
				query = this.query = parseQuery();

			this
				.initEditor()
				.registerEvents();

			// defines 'code' property
			Object.defineProperty(this, 'code', {
				get: function() {
					return this.editor.getValue();
				},
				set: function(v) {
					form.code.value = v;
					this.editor.setValue(v);
				}
			});

			// if json parameter is given, use it
			// URL (where JSON is located) is also allowed
			if (query.json) {
				this.code = query.json;
				this.go();
			}
		},
		fn = App.prototype;

	// registers events
	fn.registerEvents = function() {
		// when user types something, remove highlighting from "bad" line
		this.editor.on('change', function() {
			this.highlightErrorLine(null);
		}.bind(this));

		// when user submits form (eg presses "Validate" button), run "go" method
		this.form.addEventListener('submit', function(evt) {
			evt.preventDefault();
			this.go();
		}.bind(this));

		// when user clicks "Clear" button, assign empty string to the "code" property
		this.form.addEventListener('reset', function(evt) {
			evt.preventDefault();
			this.code = '';
		}.bind(this));

		// when Ctrl-Enter is pressed, run "go" method
		doc.addEventListener('keyup', function(evt) {
			if (evt.ctrlKey && evt.keyCode == 13) {
				this.go();
		  	}
		}.bind(this));

		// expands/unexpands faq by clicking #faqButton
		$('#faqButton').addEventListener('click', function(evt) {
			evt.preventDefault();
			$('#faq').classList.toggle('expand');
		});

		// initializes Google Analytics tracking
		// when user clicks on [data-ga="blah"], call ga('send', 'pageview', '/blah');
		$$('[data-ga]').forEach(function(node) {
			node.addEventListener('click', function() {
				ga('send', 'pageview', '/' + node.getAttribute('data-ga'));
			});
		});

		return this;
	};

	// initializes CodeMirror editor
	fn.initEditor = function() {
		this.editor = CodeMirror.fromTextArea(this.form.code, {
			lineNumbers: true,
			styleActiveLine: true,
			matchBrackets: true,
			indentWithTabs: true,
			autofocus: true
		});

		return this;
	};

	// the main function of this app
	fn.go = function() {
		var code = this.code;
		// if URL is given, fetch data on this URL
		if (code.indexOf('http') === 0) {
			this.fetch(code, function(resp) {
				// if fetching is OK, run validator
				this.validate(resp);
			}, function(err) {
				// if not, show error
				this.notify(false, err);
			});
		// if non-url is given, run validator
		} else {
			this.validate();
		}

		return this;
	};

	// combs JSON depending on query.reformat value
	// code argument is optional
	fn.comb = function(code) {
		code = typeof code == 'undefined' ? this.code : code;

		// if reformat==compress, use minifier
		// if reformat==no, keep code as is
		// else beautify code
		if (this.query.reformat == 'compress') {
			code = minify(code) || code;
		} else if(this.query.reformat != 'no') {
			code = beautify.js_beautify(code, {
				indent_with_tabs: true
			});
		}

		this.code = code;

		return this;
	};

	// validates JSON
	// code argument is optional
	fn.validate = function(code) {
		var lineMatches;

		this.comb(code);
		code = this.code;

		try {
			JSON.parse(code);
			this.notify(true, 'Valid JSON');
		} catch(_e) {
			try {
				jsonlint.parse(code);
				this.notify(true, 'Valid JSON');
			} catch (e) {
				// retrieve line number from error
				lineMatches = e.message.match(/line ([0-9]*)/);

				if (lineMatches && lineMatches.length > 1) {
					this.highlightErrorLine(+lineMatches[1]-1);
				}

				this.notify(false, e);
			}
		}

		return this;
	};

	// displays success or error message about validation status
	fn.notify = function(success, text) {
		var result = $('#result');
		$('#result-container').classList.add('shown');
		// ie10 doesn't support 2nd argument in classList.toggle
		result.classList[success ? 'add' : 'remove']('success');
		result.classList[!success ? 'add' : 'remove']('error');
		result.innerHTML = text;

		return this;
	};

	// highlights given line of code
	// if null is passed function removes highlighting
	fn.highlightErrorLine = function(line) {
		if(typeof line == 'number') {
			this.errorLine = this.editor.addLineClass(line, 'background', 'line-error');
			this.editor.setCursor(line);
		} else if(this.errorLine) {
			this.editor.removeLineClass(this.errorLine, 'background', 'line-error');
			this.errorLine = null;
		}

		return this;
	};

	// makes request to external resource via php proxy
	fn.fetch = function(url, success, error) {
		var req = new XMLHttpRequest();
		req.onreadystatechange = function() {
			var resp;
			if (req.readyState === XMLHttpRequest.DONE) {
				if (req.status === 200) {
					resp = JSON.parse(req.responseText);


					if(resp.error) {
						// if proxy returns error call error callback
						error.call(this, resp.result);
					} else {
						// else everything is awesome
						success.call(this, resp.content);
					}
				} else {
					// if status is not 200 call error callback
					error.call(this, req.statusText || 'Unable to connect');
				}
			}
		}.bind(this);


		req.open('POST', 'proxy.php');
		req.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
		req.send('url=' + encodeURIComponent(url));

		return this;
	};


	//  -- utilites --

	// parses URL
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

	// selects one node matched given selector
	function $(selector, ctx) {
		return (ctx || document).querySelector(selector);
	}

	// selects all nodes matched given selector
	function $$(selector, ctx) {
		return [].slice.call((ctx || document).querySelectorAll(selector));
	}

	// initializes the application
	return window.app = new App();
});
