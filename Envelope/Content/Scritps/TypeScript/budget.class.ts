import { IEnvelope, ITransaction, IFixedEnvelope, IVariableEnvelope, ISummary } from "./all.interface";
import { Helpers } from "./helper.class";

export class newBudget {
    private _transactions: (ITransaction | undefined)[] = [];
    private _envelopes: IEnvelope[] = [];
    private _envelopeNames: string[] = [];
    private _ammount: number;

    private _envelopeIndexError = new Error('No envelope exists with that name.');
    private _envelopeArgumentError = new Error('Envelope already exists');
    private _transactionIndexError = new Error('No transaction exists with that id.');

    public readonly name: string;

    constructor(name: string, envelopes?: IEnvelope[], transactions?: ITransaction[]) {
        this.name = name;

        //add deep copy of all envelopes
        envelopes?.forEach(envelope => {
            this.addEnvelope(envelope);
        });

        //add deep copy of all Transactions
        transactions?.forEach(transaction => {
            this.addTransaction(transaction);
        });
    }

    public get ammount(): number {
        return this._transactions.reduce((prev: number, cur: ITransaction) => prev + (cur ? cur.ammount : 0), 0);
    }

    public getEnvelopes(): IEnvelope[] {
        return Helpers.deepCopyObject(this._envelopes);
    }

    public getEnvelope(name: string): IEnvelope {
        const i = this._getEnvelopeIndex(name);
        let envelope = this._envelopes[i];
        return Helpers.deepCopyObject(envelope);
    }

    public addEnvelope(envelope: IEnvelope): void {
        if (this._envelopeNames.indexOf(envelope.envelopeName) < 0) {
            this._envelopes.push(Helpers.deepCopyObject(envelope));
            this._envelopeNames.push(envelope.envelopeName);
        } else {
            throw this._envelopeArgumentError;
        }
    }

    public updateEnvelope(selectorName: string, envelope: IFixedEnvelope | IVariableEnvelope): void;
    public updateEnvelope(selectorName: string, envelope?: string, target?: number, leftovers?: number): void;
    public updateEnvelope(selectorName: string, env?: IFixedEnvelope | IVariableEnvelope | string, target?: number, leftovers?: number): void {
        let i = this._getEnvelopeIndex(selectorName);
        let envelope = this._envelopes[i];

        if (Helpers.isIVariableEnvelope(env)) {
            let info = env as IVariableEnvelope;
            leftovers = info.leftovers;
            target = undefined;
            env = info.envelopeName;
        } else if (!(env instanceof String)) {
            let info = env as IFixedEnvelope;
            leftovers = info.leftovers;
            target = info.target;
            env = info.envelopeName;
        }

        if (env)
            envelope.envelopeName = env as string;
        if (target)
            envelope.target = target;
        if (leftovers || leftovers == 0)
            envelope.leftovers = leftovers;
    }

    public deleteEnvelope(name: string): boolean {
        const i = this._getEnvelopeIndex(name);
        this._envelopes.splice(i, 1);
        this._envelopeNames.splice(i, 1);
        return true;
    }

    public getTransactonList(): ITransaction[] {
        return Helpers.deepCopyObject(this._transactions);
    }

    public getTransaction(id: number): ITransaction {
        if (id < this._transactions.length)
            return Helpers.deepCopyObject(this._transactions[id]);
        else
            throw this._transactionIndexError
    }

    public addTransaction(transacrion: ITransaction): void {
        transacrion.id = this._transactions.length;
        this._transactions.push(Helpers.deepCopyObject(transacrion))
    }

    public updateTransaction(id: number, transacrion: ITransaction): void;
    public updateTransaction(id: number, ammount?: number, envelope?: IEnvelope, sumary?: string, dateSent?: Date, dateProcessed?: Date, description?: string)
    public updateTransaction(id: number, trans?: ITransaction | number, env?: IEnvelope, summary?: string, dateSent?: Date, dateProcessed?: Date, description?: string) {
        let transaction: ITransaction;

        if (trans && Helpers.isITransaction(trans)) {
            transaction = trans as ITransaction;
        } else if (id < this._transactions.length && this._transactions[id]) {
            transaction = this._transactions[id] as ITransaction;
        } else {
            throw this._transactionIndexError;
        }

        if ((trans || trans === 0) instanceof Number) transaction.ammount = trans as number;
        if (env && Helpers.isIEnvelope(env)) transaction.envelope = env;
        if (summary) transaction.summary = summary;
        if (dateSent) transaction.dateSent = dateSent;
        if (dateProcessed) transaction.dateProcessed = dateProcessed;
        if (description) transaction.description = description;
    }

    public deleteTransaction(id) {
        if (id < this._transactions.length)
            this._transactions[id] = undefined;
        else
            throw this._transactionIndexError;
    }

    public monthEnd(): ISummary {
        //groups transactions by envelope
        let transactions: ITransaction[][] = [];
        for (const envelopeName in this._envelopeNames) {
            {
                transactions.push([]);
            }
        }
        this._transactions.forEach((value) => {
            if (value && !value.dateProcessed)
                transactions[this._getEnvelopeIndex(value.envelope.envelopeName)].push(value);
        })
        //updates leftovers for all envelopes
        for (let i = 0; i < this._envelopeNames.length; i++) {
            let envelope = this._envelopes[i];
            let envelopeTransactions = transactions[i];

            if (envelopeTransactions.length > 0)
                envelope.leftovers = envelope.remaining(envelopeTransactions);
            //if envelope is variable
            if (Helpers.isIVariableEnvelope(envelope)) {
                //  update envelope target based on trasactions
                (envelope as IVariableEnvelope).updateTarget(envelopeTransactions)
            }
        }
        // generate summary
        return this._generateSummary();
    }
    private _generateSummary(): ISummary {
        throw new Error("Method not implemented.");
    }

    private _getEnvelopeIndex(name: string): number {
        let i: number = this._envelopeNames.indexOf(name);
        if (i < 0)
            throw this._envelopeIndexError;
        return i;
    }
}
