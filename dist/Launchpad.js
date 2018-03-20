(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else if(typeof exports === 'object')
		exports["Launchpad"] = factory();
	else
		root["Launchpad"] = factory();
})(window, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/index.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nvar _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if (\"value\" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();\n\nfunction _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }\n\nfunction _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError(\"Cannot call a class as a function\"); } }\n\nvar Launchpad = function () {\n  _createClass(Launchpad, null, [{\n    key: 'isPage',\n    value: function isPage(status) {\n      return status >= 176 && status < 192;\n    }\n  }, {\n    key: 'isScene',\n    value: function isScene(status, note) {\n      return !Launchpad.isPage(status) && note % 8 === 0 && note / 8 % 2 === 1;\n    }\n  }, {\n    key: 'isGrid',\n    value: function isGrid(status, note) {\n      return !(Launchpad.isPage(status) || Launchpad.isScene(status, note));\n    }\n  }, {\n    key: 'controllerToPage',\n    value: function controllerToPage(cc) {\n      return cc - 104;\n    }\n  }, {\n    key: 'pageToController',\n    value: function pageToController(page) {\n      return page + 104;\n    }\n  }, {\n    key: 'noteToScene',\n    value: function noteToScene(note) {\n      return Math.floor(note / 16);\n    }\n  }, {\n    key: 'sceneToNote',\n    value: function sceneToNote(scene) {\n      return scene * 16 + 8;\n    }\n  }, {\n    key: 'noteToGrid',\n    value: function noteToGrid(note) {\n      var _ref = [Math.floor(note / 16), note % 8],\n          row = _ref[0],\n          col = _ref[1];\n\n      return 8 * row + col;\n    }\n  }, {\n    key: 'gridToNote',\n    value: function gridToNote(number) {\n      var _ref2 = [Math.floor(number / 8), number % 8],\n          row = _ref2[0],\n          col = _ref2[1];\n\n      return 16 * row + col;\n    }\n  }, {\n    key: 'createInputStub',\n    value: function createInputStub() {\n      return {\n        on: function on() {},\n        addEventListener: function addEventListener() {}\n      };\n    }\n  }, {\n    key: 'createOutputStub',\n    value: function createOutputStub() {\n      return {\n        send: function send() {},\n        sendMessage: function sendMessage() {}\n      };\n    }\n  }, {\n    key: 'create',\n    value: function create() {\n      for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {\n        args[_key] = arguments[_key];\n      }\n\n      return new (Function.prototype.bind.apply(Launchpad, [null].concat(args)))();\n    }\n  }]);\n\n  function Launchpad(input, output) {\n    var _this = this;\n\n    var config = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};\n\n    _classCallCheck(this, Launchpad);\n\n    this.config = Object.assign({}, Launchpad.defaultConfig, config);\n    this.input = input;\n    this.output = output;\n    this.handlers = [];\n\n    var handleMessage = function handleMessage(data) {\n      if (_this.config.debugRawMidiInput) {\n        console.log('[Launchpad] input:', data);\n      }\n\n      _this.handlers.forEach(function (h) {\n        return h.apply(undefined, _toConsumableArray(data));\n      });\n    };\n\n    if (!this.input) {\n      \"development\" !== 'test' && console.warn('[Launchpad] `input` is undefined; using stub');\n\n      this.input = Launchpad.createInputStub();\n    }\n\n    if (!this.output) {\n      \"development\" !== 'test' && console.warn('[Launchpad] `output` is undefined; using stub');\n\n      this.output = Launchpad.createOutputStub();\n    }\n\n    if (this.config.isNodeMidi) {\n      this.input.on('message', function (_, data) {\n        handleMessage(data);\n      });\n    } else {\n      this.input.addEventListener('midimessage', function (msg) {\n        handleMessage(msg.data);\n      });\n    }\n  }\n\n  _createClass(Launchpad, [{\n    key: 'controllerToPage',\n    value: function controllerToPage(cc) {\n      return this.normalize ? Launchpad.controllerToPage(cc) : cc;\n    }\n  }, {\n    key: 'pageToController',\n    value: function pageToController(page) {\n      return this.normalize ? Launchpad.pageToController(page) : page;\n    }\n  }, {\n    key: 'noteToScene',\n    value: function noteToScene(note) {\n      return this.normalize ? Launchpad.noteToScene(note) : note;\n    }\n  }, {\n    key: 'sceneToNote',\n    value: function sceneToNote(scene) {\n      return this.normalize ? Launchpad.sceneToNote(scene) : scene;\n    }\n  }, {\n    key: 'noteToGrid',\n    value: function noteToGrid(note) {\n      return this.normalize ? Launchpad.noteToGrid(note) : note;\n    }\n  }, {\n    key: 'gridToNote',\n    value: function gridToNote(number) {\n      return this.normalize ? Launchpad.gridToNote(number) : number;\n    }\n  }, {\n    key: 'send',\n    value: function send() {\n      var sendMethod = this.config.isNodeMidi ? 'sendMessage' : 'send';\n\n      for (var _len2 = arguments.length, message = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {\n        message[_key2] = arguments[_key2];\n      }\n\n      this.output[sendMethod](message);\n    }\n  }, {\n    key: 'allOff',\n    value: function allOff() {\n      this.send(176, 0, 0);\n    }\n  }, {\n    key: 'shouldIgnore',\n    value: function shouldIgnore(value) {\n      return value === 0 && this.config.ignore0Velocity;\n    }\n  }, {\n    key: 'onMessage',\n    value: function onMessage(fn) {\n      this.handlers.push(fn);\n    }\n  }, {\n    key: 'shouldIgnoreIncomingPage',\n    value: function shouldIgnoreIncomingPage(status, value) {\n      return !Launchpad.isPage(status) || this.shouldIgnore(value);\n    }\n  }, {\n    key: 'onPage',\n    value: function onPage(fn) {\n      var _this2 = this;\n\n      this.handlers.push(function (status, cc, value) {\n        if (!_this2.shouldIgnoreIncomingPage(status, value)) {\n          fn(_this2.controllerToPage(cc), value);\n        }\n      });\n    }\n  }, {\n    key: 'setPage',\n    value: function setPage(page, color) {\n      this.send(176, this.pageToController(page), color);\n    }\n  }, {\n    key: 'shouldIgnoreIncomingScene',\n    value: function shouldIgnoreIncomingScene(status, note, value) {\n      return !Launchpad.isScene(status, note) || this.shouldIgnore(value);\n    }\n  }, {\n    key: 'onScene',\n    value: function onScene(fn) {\n      var _this3 = this;\n\n      this.handlers.push(function (status, note, value) {\n        if (!_this3.shouldIgnoreIncomingScene(status, note, value)) {\n          fn(_this3.noteToScene(note), value);\n        }\n      });\n    }\n  }, {\n    key: 'setScene',\n    value: function setScene(scene, color) {\n      this.send(144, this.sceneToNote(scene), color);\n    }\n  }, {\n    key: 'shouldIgnoreIncomingGrid',\n    value: function shouldIgnoreIncomingGrid(status, note, value) {\n      return !Launchpad.isGrid(status, note) || this.shouldIgnore(value);\n    }\n  }, {\n    key: 'onGrid',\n    value: function onGrid(fn) {\n      var _this4 = this;\n\n      this.handlers.push(function (status, note, value) {\n        if (!_this4.shouldIgnoreIncomingGrid(status, note, value)) {\n          fn(_this4.noteToGrid(note), value);\n        }\n      });\n    }\n  }, {\n    key: 'setGrid',\n    value: function setGrid(number, color) {\n      this.send(144, this.gridToNote(number), color);\n    }\n  }, {\n    key: 'normalize',\n    get: function get() {\n      return this.config.normalize;\n    }\n  }]);\n\n  return Launchpad;\n}();\n\nLaunchpad.defaultConfig = {\n  ignore0Velocity: true,\n  normalize: true,\n  isNodeMidi: false,\n  debugRawMidiInput: false\n};\n\nLaunchpad.colors = {\n  off: 12,\n  redLow: 13,\n  red: 15,\n  amberLow: 29,\n  amber: 63,\n  yellow: 62,\n  greenLow: 28,\n  green: 60\n};\n\nmodule.exports = Launchpad;\n\n//# sourceURL=webpack://Launchpad/./src/index.js?");

/***/ })

/******/ });
});