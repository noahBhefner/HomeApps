"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MonthEnd = exports.Helpers = void 0;
var Helpers = /** @class */ (function () {
    function Helpers() {
    }
    Helpers.deepCopyObject = function (obj) {
        return JSON.parse(JSON.stringify(obj));
    };
    Helpers.isIEnvelope = function (obj) {
        return 'envelopeName' in obj && 'target' in obj && 'leftovers' in obj && 'remaining' in obj;
    };
    Helpers.isIVariableEnvelope = function (obj) {
        return this.isIEnvelope(obj) && 'updateTarget' in obj;
    };
    Helpers.isITransaction = function (obj) {
        return 'id' in obj && 'ammount' in obj && 'envelope' in obj && 'sumary' in obj && 'dateSent' in obj && 'dateProcessed' in obj && 'description' in obj;
    };
    return Helpers;
}());
exports.Helpers = Helpers;
var MonthEnd = /** @class */ (function () {
    function MonthEnd(ammount, month) {
        this.ammount = ammount;
        this.month = month.getMonth();
        this.year = month.getFullYear();
    }
    return MonthEnd;
}());
exports.MonthEnd = MonthEnd;
//# sourceMappingURL=helper.class.js.map