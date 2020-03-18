export class Account {
	date: string;
	description: string;
	debitAmount: number;
	creditAmount: number;


	constructor(dt: string, desc: string, debit: number,credit: number){
			this.date = dt,
			this.description = desc,
			this.debitAmount = debit,
			this.creditAmount = credit
		}
}