"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var budget_class_1 = require("./budget.class");
var BudgetModel = /** @class */ (function () {
    function BudgetModel() {
    }
    return BudgetModel;
}());
var BudgetView = /** @class */ (function () {
    function BudgetView() {
    }
    BudgetView.prototype.initDomElements = function () {
        this._domElements.grid = document.getElementById('grid');
    };
    BudgetView.prototype.getDomElements = function () {
        return this._domElements;
    };
    return BudgetView;
}());
var BudgetController = /** @class */ (function () {
    function BudgetController() {
        this.model = new BudgetModel();
        this.view = new BudgetView();
    }
    BudgetController.prototype.init = function () {
        this.budget = new budget_class_1.Budget("MyBudget");
        this.view.initDomElements();
        this.dom = this.view.getDomElements();
    };
    return BudgetController;
}());
var controller = new BudgetController();
document.addEventListener("load", function (e) { return controller.init(); });
//# sourceMappingURL=envelope.view.js.map