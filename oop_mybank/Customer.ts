import BankAccount from "./BankAccount.js";

export default class Customer {
    public bankAccount: BankAccount = new BankAccount()

    constructor(
        public user_id: string, 
        public firstName: string, 
        public lastName: string,
        public gender: string,
        public age: number,
        public mobileNumber: string,
        public user_pin: number, 
        ) {}
    
    customerInfo():string {
        return `
            Name: ${this.firstName} ${this.lastName}
            Age: ${this.age}
            Gender: ${this.gender}
            Mobile: ${this.mobileNumber}
            Account Balance: ${this.bankAccount.AccountBalance}
        `;
    }
}