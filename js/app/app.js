"use strict";

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var _libCodemirror = require('lib/codemirror');

var _libCodemirror2 = _interopRequireDefault(_libCodemirror);

window.app = new function Main() {
	_classCallCheck(this, Main);

	var myCodeMirror = (0, _libCodemirror2["default"])(document.body, {
		value: "function myScript(){return 100;}\n",
		mode: "javascript"
	});
	/*super()
 	.bindNode('sandbox', '#app')
 	.setClassFor({
 		todos: Todos,
 		randomCat: RandomCat
 	});*/
}();