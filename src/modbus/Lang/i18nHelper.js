"use strict";
var i8nHelper = (function () {
    function i8nHelper(lang) {
    }
    i8nHelper.prototype.Inst = function (lang) {
        if ((i8nHelper.instance == undefined) || (i8nHelper.lang != lang)) {
            i8nHelper.instance = new i8nHelper(lang);
            i8nHelper.lang = lang;
        }
        return i8nHelper.instance;
    };
    i8nHelper.prototype.Get = function (key) {
        var rest = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            rest[_i - 1] = arguments[_i];
        }
        return key;
    };
    return i8nHelper;
}());
exports.i8nHelper = i8nHelper;
//# sourceMappingURL=i18nHelper.js.map