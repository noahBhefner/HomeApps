"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Envelope = /** @class */ (function () {
    function Envelope() {
    }
    Envelope.prototype.remaining = function (transactions) {
        throw new Error("Method not implemented.");
    };
    return Envelope;
}());
var VariableEnvelope = /** @class */ (function () {
    function VariableEnvelope(target) {
        this._Targets = [target];
    }
    ;
    Object.defineProperty(VariableEnvelope.prototype, "target", {
        get: function () {
            return this._Targets.reduce(function (prev, cur) { return prev + cur; });
        },
        enumerable: false,
        configurable: true
    });
    VariableEnvelope.prototype.remaining = function (transactions) {
        var total = transactions.reduce(function (prev, cur) { return prev + cur.ammount; }, 0);
        return this.target - total;
    };
    VariableEnvelope.prototype.updateTarget = function (transactions) {
        var total = transactions.reduce(function (prev, cur) { return prev + cur.ammount; }, 0);
        return this.target;
    };
    return VariableEnvelope;
}());
//# sourceMappingURL=envelope.class.js.map