export class Account {
	id: string;
	date: string;
	description: string;
	debitAmount: number;
	creditAmount: number;


	constructor(id: string, dt: string, desc: string, debit: number,credit: number) {
			this.id =  id;
			this.date = dt;
			this.description = desc;
			this.debitAmount = debit;
			this.creditAmount = credit;
		}
		
}