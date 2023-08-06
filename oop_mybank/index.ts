/*
You need to register first to use this bank
A Sample credential is
user_id: hunain
user_pin: 1234

you can make your own users as well
*/

import inquirer from "inquirer";
import chalk from "chalk";
import Customer from "./Customer.js";

console.clear();
console.log(chalk.bgGray(`Welcome to the Bank`));

let customers : Customer[] = []

customers.push(new Customer("hunain", "Hunain", "Hyder", "Male", 20, "000000000000", 1234))
customers[0].bankAccount.AccountBalance = 1000;

let loggedInUser;

let loggedIn : boolean = false

let exit : boolean = false;

let message : string = chalk.grey(`You first have to register your account to log in`);

while (!exit) {
    console.clear
    console.log(chalk.bgGray(`International Bank`))    
    console.log(message)
    const screenChose : {response: string} = await inquirer.prompt({
        type: "list",
        name: "response",
        message: "Main Menu",
        choices: [
            "Login",
            "Register",
            "Exit"
        ]
    })

    switch (screenChose.response) {
        case "Login":
            while(!loggedIn) {
                const answers : { user_id : string, user_pin : number, operation: string } = await inquirer.prompt([
                    {
                        type: "input",
                        name: "user_id",
                        message: "Enter your user id: "
                    },
                    {
                        type: "number",
                        name: "user_pin",
                        message: "Enter your pin code: "
                    }
                ]);
                
                for (let i: number = 0; i < customers.length; i++) {
                    if (answers.user_id.trim().toLowerCase() == customers[i].user_id && answers.user_pin == customers[i].user_pin) {
                        loggedInUser = customers[i];
                        loggedIn = true;
                        break;
                    }
                }
                
                console.log(chalk.red(`Invalid User Id/User Pin`))
            }
            
            if (loggedIn && loggedInUser) {
                let loginMenuMessage:string = "";
                while (loggedIn) {
                    console.clear()
                    console.log(`Welcome to the CLI Bank Mr. ${loggedInUser.firstName} ${loggedInUser.lastName}!`)
                    console.log(`Your Current Balance is : ${loggedInUser.bankAccount.AccountBalance}$`)
                    console.log(loginMenuMessage);

                    let answers = await inquirer.prompt({
                        type: "list",
                        name: "operation",
                        choices: ["Deposit", "Withdraw", "Loan", "Logout"]
                    })
                
                    if (answers.operation == "Loan") 
                    {
                        let loan : number = 0;
                        let validInput: boolean = false;
                        while (!validInput)  {
                            let loanAmount = await inquirer.prompt({
                                type: "number",
                                name:"amount",
                                message: "Enter how much loan do you need? (in $)"
                            });
                            if (!Number.isNaN(loanAmount.amount))
                            {
                                validInput = true;
                                loan = loanAmount.amount;
                            }
                        }
                        loginMenuMessage = chalk.green(`Your application for loan is accepted. Now you have ${loggedInUser.bankAccount.AccountBalance + loan}$ in your account. Enjoy the money but remember to pay back on time.`)
                        loggedInUser.bankAccount.AccountBalance += loan;
                    } 
                    else if (answers.operation == "Deposit") 
                    {
                        let newBalance: number = 0;
                        let validInput: boolean = false;
                        while (!validInput) {
                            let deposit : { amount: number } = await inquirer.prompt({
                                type: "number",
                                name: "amount",
                                message: "Enter money to deposit (in $): "
                            });

                            if (!Number.isNaN(deposit.amount))
                            {
                                validInput = true;
                                newBalance = deposit.amount;
                            }
                        }
                        
                        loginMenuMessage = chalk.green(`Your previous account balance was ${loggedInUser.bankAccount.AccountBalance}$.\nAfter this transaction your current account balance is ${loggedInUser.bankAccount.AccountBalance + newBalance}$.`)
                        loggedInUser.bankAccount.AccountBalance += newBalance;
                    }  
                    else if (answers.operation == "Withdraw") 
                    {
                        let amount: number = 0;
                        let validInput: boolean = false;
                        while (!validInput) {
                            let amountToWithdraw : { amount: number } = await inquirer.prompt({
                                type: "number",
                                name: "amount",
                                message: "Enter money to withdraw (in $): "
                            });
                            
                            if (!Number.isNaN(amountToWithdraw.amount))
                            {
                                validInput = true;
                                amount = amountToWithdraw.amount;
                            }
                        }
                        
                        if (loggedInUser.bankAccount.AccountBalance < amount)
                        {
                            loginMenuMessage = chalk.red(`Sorry this transaction could not be done because your withdraw amount is greater than current account balance.\nDon't be oversmart with the Bank`)
                        }
                        else {
                            loginMenuMessage = chalk.green(`After this transaction your current account balance is ${loggedInUser.bankAccount.AccountBalance - amount}$.`)
                            loggedInUser.bankAccount.AccountBalance -= amount;
                        }
                    }
                    else if (answers.operation == "Logout") {
                        loggedIn = false;
                        break;
                    }
                }
            }
            break;
        case "Register":
            let correctInfo : boolean = false;
            
            let customerDetails : [string, string, string, string, number, string, number] = ["", "", "", "", 0, "", 0];

            while (!correctInfo) {
                const userDetails = await inquirer.prompt([
                    {
                        type: "input",
                        name: "firstName",
                        message: "Enter your first name: "
                    },
                    {
                        type: "input",
                        name: "lastName",
                        message: "Enter your last name: "
                    },
                    {
                        type: "input",
                        name: "user_id",
                        message: "Create your user id: "
                    },
                    {
                        type: "number",
                        name: "user_pin",
                        message: "Create your pin code: (It should be a 4 digit code)"
                    }
                ])   
                
                if (userDetails.user_id == "" || userDetails.user_pin == "") {
                    console.log(chalk.red(`User ID and User pin cannot be empty`));
                } else if (Number.isNaN(userDetails.user_pin) || userDetails.user_pin.length < 4) {
                    console.log(chalk.red(`User pin should be a 4 digit number`));
                } else { 
                    correctInfo = true; 
                    customerDetails[1] = userDetails.firstName;
                    customerDetails[2] = userDetails.lastName;
                    customerDetails[0] = userDetails.user_id;
                    customerDetails[6] = userDetails.user_pin;
                }
            }

            correctInfo = false;

            while (!correctInfo) {
                const userDetails = await inquirer.prompt([
                    {
                        type: "list",
                        name: "gender",
                        message: "Select your gender: ",
                        choices: ["Male", "Female"]
                    },
                    {
                        type: "number",
                        name: "age",
                        message: "Enter your age: "
                    },
                    {
                        type: "input",
                        name: "mobile",
                        message: "Enter your mobile number: "
                    }
                ])   
                
                if (Number.isNaN(userDetails.age)) {
                    console.log(chalk.red(`Please Enter a valid age`));
                } else { 
                    correctInfo = true; 
                    customerDetails[3] = userDetails.gender;
                    customerDetails[4] = userDetails.age;
                    customerDetails[5] = userDetails.mobile;
                }
            }

            customers.push(new Customer(...customerDetails))
            message = chalk.green("Sucessfully registered")
            break;
        case "Exit":
            exit = true;
            break;
    }
}