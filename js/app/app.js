define([
	'codemirror',
	'jsonlint',
	'js-beautify',
	'javascript-syntax'
],
function(CodeMirror, jsonlint, beautify) {
	'use strict';
	var doc = document,
		App = function App() {
			var _this = this,
				form = this.form = doc.forms.main,
				codeInput = this.form.code,
				editor = this.editor = CodeMirror.fromTextArea(doc.getElementById("code"), {
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
				if(this.code.indexOf('http') == 0) {
					this.fetch(this.code, function(resp) {
						this.validate(resp);
					}, function(err) {
						this.notify(false, err)
					});
				} else {
					this.validate();
				}

			}.bind(this));
		},
		fn = App.prototype;

	fn.validate = function(code) {
		this.code = beautify.js_beautify(typeof code == 'undefined' ? this.code : code);

		try {
			jsonlint.parse(this.code);
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
					error && error.call(this, req.statusText || 'Fetch error')
				}
			}
		}.bind(this);

		req.open('GET', url);
		req.send('url=' + encodeURIComponent(url));
	}

	return window.app = new App();
});
