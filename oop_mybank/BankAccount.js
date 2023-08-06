export default class BankAccount {
    AccountBalance;
    constructor() {
        this.AccountBalance = 0;
    }
    Debit(d) {
        let statement = "Sorry you have insuffiecient balance";
        if (d > 0) {
            statement = "The amount you entered is wrong";
            if (this.AccountBalance > d) {
                this.AccountBalance = this.AccountBalance - d;
                statement = "Transaction successful! New account balance is " + this.AccountBalance;
            }
            else {
                statement = "You don't have enough money to do this transaction.";
            }
        }
        return statement;
    }
    Credit(d) {
        let statement = "Transaction failed. Enter valid amount";
        if (d > 0) {
            this.AccountBalance = this.AccountBalance + d;
            if (d > 100) {
                this.AccountBalance = this.AccountBalance - 1;
            }
            statement = "Your account has been credited successfully!";
        }
        return statement;
    }
}
