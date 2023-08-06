import inquirer from "inquirer";
import chalk from "chalk";
console.clear();
console.log(chalk.bgGray("Welcome to ATM. An ATM on a CLI."));
let credentials = [
    { user_id: "john", user_pin: 1234, currentBalance: Math.floor(Math.random() * 100) },
    { user_id: "hunain", user_pin: 8080, currentBalance: Math.floor(Math.random() * 100) },
    { user_id: "piaic", user_pin: 9999, currentBalance: Math.floor(Math.random() * 100) }
];
let loggedInUser;
let loggedIn = false;
while (!loggedIn) {
    const answers = await inquirer.prompt([
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
    for (let i = 0; i < credentials.length; i++) {
        if (answers.user_id.trim().toLowerCase() == credentials[i].user_id && answers.user_pin == credentials[i].user_pin) {
            loggedInUser = credentials[i];
            loggedIn = true;
            break;
        }
    }
    console.log(chalk.red(`Invalid User Id/User Pin`));
}
if (loggedIn && loggedInUser) {
    console.clear();
    console.log(`Welcome to the CLI ATM Mr. ${loggedInUser.user_id}!`);
    console.log(`Your Current Balance is : ${loggedInUser.currentBalance}$`);
    let answers = await inquirer.prompt({
        type: "list",
        name: "operation",
        choices: ["Withdraw", "Deposit", "Loan"]
    });
    if (answers.operation == "Loan") {
        let loanAmount = await inquirer.prompt({
            type: "number",
            name: "amount",
            message: "Enter how much loan do you need? (in $)"
        });
        console.log(`Your application for loan is accepted. Now you have ${loggedInUser.currentBalance + loanAmount.amount}$ in your account. Enjoy the money but remember to pay back on time.`);
    }
    else if (answers.operation == "Deposit") {
        let newBalance = await inquirer.prompt({
            type: "number",
            name: "amount",
            message: "Enter money to deposit (in $): "
        });
        console.log(`Your previous account balance was ${loggedInUser.currentBalance}$.`);
        console.log(`After this transaction your current account balance is ${loggedInUser.currentBalance + newBalance.amount}$.`);
    }
    else if (answers.operation == "Withdraw") {
        let amountToWithdraw = await inquirer.prompt({
            type: "number",
            name: "amount",
            message: "Enter money to withdraw (in $): "
        });
        if (loggedInUser.currentBalance < amountToWithdraw.amount) {
            console.log(`Sorry this transaction could not be done because your withdraw amount is greater than current account balance.`);
            console.log(`Don't be oversmart with the ATM`);
        }
        else {
            console.log(`After this transaction your current account balance is ${loggedInUser.currentBalance - amountToWithdraw.amount}$.`);
        }
    }
}
