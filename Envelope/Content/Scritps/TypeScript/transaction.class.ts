import { ITransaction, IEnvelope } from "./all.interface";

class Transaction implements ITransaction {
    private _id: number = -1;
    public get id(): number {
        return this._id;
    };
    public set id(i: number) {
        if (this._id < 0)
            this._id = i;
    }
    ammount: number;
    envelope: IEnvelope;
    summary: string;
    dateSent: Date;
    dateProcessed: Date;
    description: string;
}