/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.l = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };

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

/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};

/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 10);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports) {

module.exports = _;

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__, exports], __WEBPACK_AMD_DEFINE_RESULT__ = function (require, exports) {
    "use strict";
    var BModule = (function () {
        function BModule(name) {
            this._name = name;
        }
        return BModule;
    }());
    exports.BModule = BModule;
}.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));


/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
!(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__, exports, __webpack_require__(7), __webpack_require__(8), __webpack_require__(6), __webpack_require__(5)], __WEBPACK_AMD_DEFINE_RESULT__ = function (require, exports, menu_view_tplt_1, submenuview_tplt_1, menuItemView_tplt_1, b) {
    "use strict";
    var MenuModule = MenuModule_1 = (function () {
        function MenuModule() {
            this.Items = new Array();
        }
        MenuModule.GetInstance = function () {
            if (MenuModule_1.instance == null) {
                MenuModule_1.instance = new MenuModule_1();
            }
            return MenuModule_1.instance;
        };
        MenuModule.addItem = function (item) {
            MenuModule_1.GetInstance()._addItem(item);
        };
        MenuModule.render = function (selector) {
            return MenuModule_1.GetInstance()._render();
        };
        MenuModule.prototype._render = function () {
            var renderText = "";
            return menu_view_tplt_1.menu_view()({ menu: this._renderItems(this.Items) });
        };
        MenuModule.prototype._renderItems = function (Items) {
            var renderText = "";
            for (var _i = 0, Items_1 = Items; _i < Items_1.length; _i++) {
                var item = Items_1[_i];
                renderText = renderText + this._renderItem(item);
            }
            return renderText;
        };
        MenuModule.prototype._renderItem = function (Item) {
            var inner = Item.childs.length > 0 ? this._renderItems(Item.childs) : "";
            if (inner !== "") {
                inner = submenuview_tplt_1.submenuview()({ submenu: inner, text: Item.text, route: '' });
                return inner;
            }
            var output = menuItemView_tplt_1.menuItemView()({ text: Item.text, childs: inner, route: '' });
            return output;
        };
        MenuModule.prototype._addItem = function (item) {
            var basep = item.url.split('/');
            if (basep.length == 1) {
                this.Items.push({
                    url: item.url,
                    basepath: item.url.split('/'),
                    icon: item.url,
                    module: item.module,
                    text: item.text,
                    childs: new Array()
                });
            }
            else {
                var parent_1 = this.findParentNode(basep, this.Items);
                parent_1.childs.push({
                    url: item.url,
                    basepath: item.url.split('/'),
                    icon: item.url,
                    module: item.module,
                    text: item.text,
                    childs: new Array()
                });
            }
        };
        MenuModule.prototype.findParentNode = function (basepath, Items) {
            var i = 0;
            var ret = this._findParentNode(i, basepath, Items);
            return ret;
        };
        MenuModule.prototype._findParentNode = function (i, basepath, Items) {
            for (var _i = 0, Items_2 = Items; _i < Items_2.length; _i++) {
                var item = Items_2[_i];
                if ((item.basepath[i] == basepath[i])
                    && (item.basepath.length < basepath.length)) {
                    if (item.basepath.length == basepath.length - 1)
                        return item;
                    i++;
                    var ret = this._findParentNode(i, basepath, item.childs);
                    return ret;
                }
            }
            return null;
        };
        return MenuModule;
    }());
    MenuModule = MenuModule_1 = __decorate([
        b.bmodule({})
    ], MenuModule);
    exports.MenuModule = MenuModule;
    var MenuModule_1;
}.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));


/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__, exports, __webpack_require__(0)], __WEBPACK_AMD_DEFINE_RESULT__ = function (require, exports, _) {
    "use strict";
    var tplt = "<nav class=\"navbar navbar-default\"><div class=\"container-fluid\"><!-- Brand and toggle get grouped for better mobile display --><div class=\"navbar-header\"><button type=\"button\" class=\"navbar-toggle collapsed\" data-toggle=\"collapse\" data-target=\"#bs-example-navbar-collapse-1\" aria-expanded=\"false\"><span class=\"sr-only\">Toggle navigation</span> <span class=\"icon-bar\"></span> <span class=\"icon-bar\"></span> <span class=\"icon-bar\"></span></button> <a class=\"navbar-brand\" href=\"#\">Menu</a></div><div class=\"collapse navbar-collapse\" id=\"menu\"></div></div></nav><div id=\"content\"></div>";
    var tpltf = function () { return _.template(tplt); };
    exports.index = tpltf;
}.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));


/***/ }),
/* 4 */
/***/ (function(module, exports) {

module.exports = jQuery;

/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__, exports, __webpack_require__(9), __webpack_require__(0)], __WEBPACK_AMD_DEFINE_RESULT__ = function (require, exports, Backbone, _) {
    "use strict";
    function bmodule(params) {
        return function (constructor) {
            return _.extend(constructor, Backbone.Events);
        };
    }
    exports.bmodule = bmodule;
}.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));


/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__, exports, __webpack_require__(0)], __WEBPACK_AMD_DEFINE_RESULT__ = function (require, exports, _) {
    "use strict";
    var tplt = "<li><a href=\"<%= route %>\"><%= text %></a><%= childs %></li>";
    var tpltf = function () { return _.template(tplt); };
    exports.menuItemView = tpltf;
}.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));


/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__, exports, __webpack_require__(0)], __WEBPACK_AMD_DEFINE_RESULT__ = function (require, exports, _) {
    "use strict";
    var tplt = "<ul class=\"nav navbar-nav\"> <%= menu %> </ul>";
    var tpltf = function () { return _.template(tplt); };
    exports.menu_view = tpltf;
}.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));


/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__, exports, __webpack_require__(0)], __WEBPACK_AMD_DEFINE_RESULT__ = function (require, exports, _) {
    "use strict";
    var tplt = "<li class=\"dropdown\"><a href=\"#\" class=\"dropdown-toggle\" data-toggle=\"dropdown\" role=\"button\" aria-haspopup=\"true\" aria-expanded=\"false\"> <%= text %> <span class=\"caret\"></span></a><ul class=\"dropdown-menu\"> <%= submenu %> </ul></li>";
    var tpltf = function () { return _.template(tplt); };
    exports.submenuview = tpltf;
}.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));


/***/ }),
/* 9 */
/***/ (function(module, exports) {

module.exports = Backbone;

/***/ }),
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__, exports, __webpack_require__(1), __webpack_require__(2), __webpack_require__(3), __webpack_require__(4), __webpack_require__(11)], __WEBPACK_AMD_DEFINE_RESULT__ = function (require, exports, bbmodule_1, menu, index_tplt_1, $, bblib_1) {
    "use strict";
    var OoMenuModule = menu.MenuModule.GetInstance();
    var BModule1 = new bbmodule_1.BModule("moduloe 1");
    var BModule2 = new bbmodule_1.BModule("moduloe 2");
    var BModule3 = new bbmodule_1.BModule("moduloe 3");
    menu.MenuModule.addItem({
        url: "home",
        module: BModule1,
        icon: "",
        text: "home"
    });
    menu.MenuModule.addItem({
        url: "home/child",
        module: BModule1,
        icon: "",
        text: "child"
    });
    menu.MenuModule.addItem({
        url: "home/child/tree",
        module: BModule3,
        icon: "",
        text: "secondchild"
    });
    menu.MenuModule.addItem({
        url: "BModule3",
        module: BModule3,
        icon: "",
        text: "BModule3"
    });
    console.log(menu.MenuModule.instance.Items);
    $('#main').html(index_tplt_1.index());
    var menustr = menu.MenuModule.render('#menu');
    $('#menu').html(menustr);
    bblib_1["default"].messagebus;
}.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));


/***/ }),
/* 11 */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__, exports, __webpack_require__(12)], __WEBPACK_AMD_DEFINE_RESULT__ = function (require, exports, messagebus_1) {
    "use strict";
    var bblib = (function () {
        function bblib() {
        }
        return bblib;
    }());
    bblib.messagebus = new messagebus_1["default"]();
    exports.__esModule = true;
    exports["default"] = bblib;
}.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));


/***/ }),
/* 12 */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
!(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__, exports, __webpack_require__(5)], __WEBPACK_AMD_DEFINE_RESULT__ = function (require, exports, bmodule_1) {
    "use strict";
    var messagebus = (function () {
        function messagebus() {
        }
        return messagebus;
    }());
    messagebus = __decorate([
        bmodule_1.bmodule({})
    ], messagebus);
    exports.messagebus = messagebus;
    exports.__esModule = true;
    exports["default"] = messagebus;
}.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));


/***/ })
/******/ ]);