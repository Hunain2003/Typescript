import inquirer from "inquirer";
import chalk from 'chalk';

console.clear();

let moreCalculations : boolean = true;

console.log(chalk.bgGray("CLI Calculator in Node.js and Typescript"))

while (moreCalculations)
{
    let validInput: boolean = false;
    
    interface Answers { num1: number, num2: number, operation: string }

    let answers: Answers = {num1: 0, num2: 0, operation:"+"};
    
    while (!validInput) {
        const unvalidatedAnswers : Answers = await inquirer.prompt(
        [
            {
                type: "number",
                name: "num1",
                message: "Enter number 1: ",
            },
            {
                type: "number",
                name: "num2",
                message: "Enter number 2: ",
            },
            {
                type: "list",
                name: "operation",
                choices: ["*", "/", "+", "-"],
                message: "Select an operator: "
            }
        ])

        if (Number.isNaN(unvalidatedAnswers.num1) || Number.isNaN(unvalidatedAnswers.num2)) {
            console.log(chalk.red(`Please enter valid numbers`))
        } else {
            validInput = true;
            answers = unvalidatedAnswers;
        }
    }

    switch (answers.operation) {
        case "+":
            console.log(answers.num1 + answers.num2);
            break;
            case "-":
                console.log(answers.num1 - answers.num2);
                break;
            case "/":
                console.log(answers.num1 / answers.num2);
                break;
        case "*":
            console.log(answers.num1 * answers.num2);
            break;
        default:
            console.log("Something went wrong...")
            break;
    }

    const doMore : {decission: string} = await inquirer.prompt({
        type: "input", 
        name: "decission", 
        message: "Do you want to do more calculations(y/n)" 
    })

    if (doMore.decission.toLowerCase() == "n" || doMore.decission.toLowerCase() == "no") {
        moreCalculations = false
        console.log("Exiting...");
    }
}