'use strict';

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var _codemirror = require('codemirror');

var _codemirror2 = _interopRequireDefault(_codemirror);

var _javascriptSyntax = require('javascript-syntax');

var _javascriptSyntax2 = _interopRequireDefault(_javascriptSyntax);

var _jsonlint = require('jsonlint');

var _jsonlint2 = _interopRequireDefault(_jsonlint);

var _jsBeautify = require('js-beautify');

//
var doc = document;

window.app = new ((function () {
	function Main() {
		var _this = this;

		_classCallCheck(this, Main);

		var form = doc.forms.main,
		    code = form.code;

		var editor = _codemirror2['default'].fromTextArea(document.getElementById("code"), {
			lineNumbers: true,
			styleActiveLine: true,
			matchBrackets: true
		});

		form.addEventListener('submit', function (evt) {
			evt.preventDefault();
			editor.setValue((0, _jsBeautify.js_beautify)(code.value));
			try {
				_jsonlint2['default'].parse(code.value);
				_this.notify(true, 'Valid JSON');
			} catch (e) {
				_this.notify(false, e);
			}
		});
	}

	_createClass(Main, [{
		key: 'notify',
		value: function notify(success, text) {
			var result = doc.querySelector('#result');
			result.classList.toggle('success', success);
			result.classList.toggle('error', !success);
			result.innerHTML = text;
		}
	}]);

	return Main;
})())();