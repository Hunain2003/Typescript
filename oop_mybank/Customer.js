import BankAccount from "./BankAccount.js";
export default class Customer {
    user_id;
    firstName;
    lastName;
    gender;
    age;
    mobileNumber;
    user_pin;
    bankAccount = new BankAccount();
    constructor(user_id, firstName, lastName, gender, age, mobileNumber, user_pin) {
        this.user_id = user_id;
        this.firstName = firstName;
        this.lastName = lastName;
        this.gender = gender;
        this.age = age;
        this.mobileNumber = mobileNumber;
        this.user_pin = user_pin;
    }
    customerInfo() {
        return `
            Name: ${this.firstName} ${this.lastName}
            Age: ${this.age}
            Gender: ${this.gender}
            Mobile: ${this.mobileNumber}
            Account Balance: ${this.bankAccount.AccountBalance}
        `;
    }
}
