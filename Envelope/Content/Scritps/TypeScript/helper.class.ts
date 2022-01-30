export abstract class Helpers {
    public static deepCopyObject(obj: any) {
        return JSON.parse(JSON.stringify(obj))
    }

    public static isIEnvelope(obj: any): boolean {
        return 'envelopeName' in obj && 'target' in obj && 'leftovers' in obj && 'remaining' in obj;
    }

    public static isIVariableEnvelope(obj: any): boolean {
        return this.isIEnvelope(obj) && 'updateTarget' in obj;
    }

    public static isITransaction(obj: any) {
        return 'id' in obj && 'ammount' in obj && 'envelope' in obj && 'sumary' in obj && 'dateSent' in obj && 'dateProcessed' in obj && 'description' in obj
    }
}

export class MonthEnd {
    ammount: number;
    month: number;
    year: number;
    constructor(ammount: number, month: Date) {
        this.ammount = ammount;
        this.month = month.getMonth();
        this.year = month.getFullYear();
    }
}