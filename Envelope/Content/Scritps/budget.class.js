"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.newBudget = void 0;
var helper_class_1 = require("./helper.class");
var newBudget = /** @class */ (function () {
    function newBudget(name, envelopes, transactions) {
        var _this = this;
        this._transactions = [];
        this._envelopes = [];
        this._envelopeNames = [];
        this._envelopeIndexError = new Error('No envelope exists with that name.');
        this._envelopeArgumentError = new Error('Envelope already exists');
        this._transactionIndexError = new Error('No transaction exists with that id.');
        this.name = name;
        //add deep copy of all envelopes
        envelopes === null || envelopes === void 0 ? void 0 : envelopes.forEach(function (envelope) {
            _this.addEnvelope(envelope);
        });
        //add deep copy of all Transactions
        transactions === null || transactions === void 0 ? void 0 : transactions.forEach(function (transaction) {
            _this.addTransaction(transaction);
        });
    }
    Object.defineProperty(newBudget.prototype, "ammount", {
        get: function () {
            return this._transactions.reduce(function (prev, cur) { return prev + (cur ? cur.ammount : 0); }, 0);
        },
        enumerable: false,
        configurable: true
    });
    newBudget.prototype.getEnvelopes = function () {
        return helper_class_1.Helpers.deepCopyObject(this._envelopes);
    };
    newBudget.prototype.getEnvelope = function (name) {
        var i = this._getEnvelopeIndex(name);
        var envelope = this._envelopes[i];
        return helper_class_1.Helpers.deepCopyObject(envelope);
    };
    newBudget.prototype.addEnvelope = function (envelope) {
        if (this._envelopeNames.indexOf(envelope.envelopeName) < 0) {
            this._envelopes.push(helper_class_1.Helpers.deepCopyObject(envelope));
            this._envelopeNames.push(envelope.envelopeName);
        }
        else {
            throw this._envelopeArgumentError;
        }
    };
    newBudget.prototype.updateEnvelope = function (selectorName, env, target, leftovers) {
        var i = this._getEnvelopeIndex(selectorName);
        var envelope = this._envelopes[i];
        if (helper_class_1.Helpers.isIVariableEnvelope(env)) {
            var info = env;
            leftovers = info.leftovers;
            target = undefined;
            env = info.envelopeName;
        }
        else if (!(env instanceof String)) {
            var info = env;
            leftovers = info.leftovers;
            target = info.target;
            env = info.envelopeName;
        }
        if (env)
            envelope.envelopeName = env;
        if (target)
            envelope.target = target;
        if (leftovers || leftovers == 0)
            envelope.leftovers = leftovers;
    };
    newBudget.prototype.deleteEnvelope = function (name) {
        var i = this._getEnvelopeIndex(name);
        this._envelopes.splice(i, 1);
        this._envelopeNames.splice(i, 1);
        return true;
    };
    newBudget.prototype.getTransactonList = function () {
        return helper_class_1.Helpers.deepCopyObject(this._transactions);
    };
    newBudget.prototype.getTransaction = function (id) {
        if (id < this._transactions.length)
            return helper_class_1.Helpers.deepCopyObject(this._transactions[id]);
        else
            throw this._transactionIndexError;
    };
    newBudget.prototype.addTransaction = function (transacrion) {
        transacrion.id = this._transactions.length;
        this._transactions.push(helper_class_1.Helpers.deepCopyObject(transacrion));
    };
    newBudget.prototype.updateTransaction = function (id, trans, env, summary, dateSent, dateProcessed, description) {
        var transaction;
        if (trans && helper_class_1.Helpers.isITransaction(trans)) {
            transaction = trans;
        }
        else if (id < this._transactions.length && this._transactions[id]) {
            transaction = this._transactions[id];
        }
        else {
            throw this._transactionIndexError;
        }
        if ((trans || trans === 0) instanceof Number)
            transaction.ammount = trans;
        if (env && helper_class_1.Helpers.isIEnvelope(env))
            transaction.envelope = env;
        if (summary)
            transaction.summary = summary;
        if (dateSent)
            transaction.dateSent = dateSent;
        if (dateProcessed)
            transaction.dateProcessed = dateProcessed;
        if (description)
            transaction.description = description;
    };
    newBudget.prototype.deleteTransaction = function (id) {
        if (id < this._transactions.length)
            this._transactions[id] = undefined;
        else
            throw this._transactionIndexError;
    };
    newBudget.prototype.monthEnd = function () {
        var _this = this;
        //groups transactions by envelope
        var transactions = [];
        for (var envelopeName in this._envelopeNames) {
            {
                transactions.push([]);
            }
        }
        this._transactions.forEach(function (value) {
            if (value && !value.dateProcessed)
                transactions[_this._getEnvelopeIndex(value.envelope.envelopeName)].push(value);
        });
        //updates leftovers for all envelopes
        for (var i = 0; i < this._envelopeNames.length; i++) {
            var envelope = this._envelopes[i];
            var envelopeTransactions = transactions[i];
            if (envelopeTransactions.length > 0)
                envelope.leftovers = envelope.remaining(envelopeTransactions);
            //if envelope is variable
            if (helper_class_1.Helpers.isIVariableEnvelope(envelope)) {
                //  update envelope target based on trasactions
                envelope.updateTarget(envelopeTransactions);
            }
        }
        // generate summary
        return this._generateSummary();
    };
    newBudget.prototype._generateSummary = function () {
        throw new Error("Method not implemented.");
    };
    newBudget.prototype._getEnvelopeIndex = function (name) {
        var i = this._envelopeNames.indexOf(name);
        if (i < 0)
            throw this._envelopeIndexError;
        return i;
    };
    return newBudget;
}());
exports.newBudget = newBudget;
//# sourceMappingURL=budget.class.js.map