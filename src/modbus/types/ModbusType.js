"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var ModbusTypes;
(function (ModbusTypes) {
    var ModbusType = (function () {
        function ModbusType(item, lang) {
            this.mItem = item;
            this.lang = lang;
        }
        return ModbusType;
    }());
    ModbusTypes.ModbusType = ModbusType;
    var NumericType = (function (_super) {
        __extends(NumericType, _super);
        function NumericType(item, lang) {
            return _super.call(this, item, lang) || this;
        }
        NumericType.prototype.Validate = function (value) {
            if ((value > this.mItem.max) || (value < this.mItem.min)) {
                this.ValidationError = this.lang.Get("mtypes.numeric.notbetween", value, this.mItem.max, this.mItem.min);
                return false;
            }
            return true;
        };
        NumericType.prototype.Set = function (value) {
            if (!this.Validate(value))
                return false;
            this.value = value;
            return true;
        };
        NumericType.prototype.Get = function () {
            return this.value;
        };
        return NumericType;
    }(ModbusType));
    ModbusTypes.NumericType = NumericType;
})(ModbusTypes = exports.ModbusTypes || (exports.ModbusTypes = {}));
//# sourceMappingURL=ModbusType.js.map