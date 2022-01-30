import { IEnvelope, IFixedEnvelope, IVariableEnvelope, ITransaction } from "./all.interface";
import { MonthEnd } from "./helper.class";

class Envelope implements IFixedEnvelope {
    target: number;
    envelopeName: string;
    leftovers: number;
    remaining(transactions: ITransaction[]): number {
        throw new Error("Method not implemented.");
    }

}

class VariableEnvelope implements IVariableEnvelope {
    private _Targets: number[];
    constructor(target: number) {
        this._Targets = [target];
    };
    envelopeName: string
    public get target(): number {
        return this._Targets.reduce((prev: number, cur: number) => prev + cur);
    }
    leftovers: number;
    remaining(transactions: ITransaction[]): number {
        const total: number = transactions.reduce((prev: number, cur: ITransaction) => prev + cur.ammount, 0)
        return this.target - total;
    }
    updateTarget(transactions: ITransaction[]): number {
        const total: number = transactions.reduce((prev: number, cur: ITransaction) => prev + cur.ammount, 0)
        return this.target;
    }
}