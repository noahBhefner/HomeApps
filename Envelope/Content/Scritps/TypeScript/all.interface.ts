export interface ITransaction {
  id: number;
  ammount: number;
  envelope: IEnvelope;
  summary: string;
  dateSent: Date;
  dateProcessed: Date;
  description: string;
}

export interface IEnvelope {
  envelopeName: string;
  target: number;
  leftovers: number;
  remaining(transactions: ITransaction[]): number;
}

export interface IFixedEnvelope extends IEnvelope {

}

export interface IVariableEnvelope extends IEnvelope {
  updateTarget(transactions: ITransaction[]): number;
}

export interface ISummary {
  title: string;
  month: Date;
  transactions: (ITransaction | undefined)[];
  notes: string[];
}