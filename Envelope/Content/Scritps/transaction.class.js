"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Transaction = /** @class */ (function () {
    function Transaction() {
        this._id = -1;
    }
    Object.defineProperty(Transaction.prototype, "id", {
        get: function () {
            return this._id;
        },
        set: function (i) {
            if (this._id < 0)
                this._id = i;
        },
        enumerable: false,
        configurable: true
    });
    ;
    return Transaction;
}());
//# sourceMappingURL=transaction.class.js.map