export class Account {
	date: Date;
	description: string;
	debitAmount: number;
	creditAmount: number;


	constructor(dt: Date, desc: string, debit: number,credit: number){
			this.date = dt,
			this.description = desc,
			this.debitAmount = debit,
			this.creditAmount = credit
		}
}