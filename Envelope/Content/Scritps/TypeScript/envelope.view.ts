import { IController, IModel, IView } from "./all.interface";
import { Budget } from "./budget.class"

class BudgetModel implements IModel {

}

class BudgetView implements IView {
    private _domElements: any;
    constructor() {
    }
    public initDomElements(): void {
        this._domElements.grid = document.getElementById('grid');

    }
    public getDomElements(): any {
        return this._domElements;
    }

}

class BudgetController implements IController {
    private budget: Budget;
    init(): void {
        this.budget = new Budget("MyBudget")
        this.view.initDomElements();
        this.dom = this.view.getDomElements();
    }
    readonly model: BudgetModel = new BudgetModel();
    readonly view: BudgetView = new BudgetView();
    dom: any;
}

const controller: BudgetController = new BudgetController();
document.addEventListener("load", (e) => controller.init());