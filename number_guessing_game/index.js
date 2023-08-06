import inquirer from "inquirer";
import chalk from "chalk";
console.clear();
let playMore = true;
console.log(chalk.bgGray("CLI Calculator in Node.js and Typescript"));
while (playMore) {
    let originalNumber = Math.floor(Math.random() * 100);
    let chancesLeft = 5;
    console.log(chalk.bgGreen("Hello. I am the computer speaking. Guess the number I've thought. It's between 1 - 100"));
    let hint = "";
    while (chancesLeft > 0) {
        console.clear();
        console.log(chalk.bgGreen(`You have ${chancesLeft} chances to guess.`));
        console.log(hint);
        let answer = { guess: 0 };
        let validInput = false;
        while (!validInput) {
            answer = await inquirer.prompt([
                {
                    type: "number",
                    name: "guess",
                    message: "Enter your guess: "
                }
            ]);
            if (!Number.isNaN(answer.guess)) {
                validInput = true;
            }
            else {
                console.log(chalk.red(`Please enter a valid number`));
            }
        }
        if (answer.guess == originalNumber) {
            console.log("Congratulations! You are right");
            break;
        }
        else if (Math.abs(answer.guess - originalNumber) > 20) {
            hint = chalk.blue(`Not right You are too far from the number`);
            chancesLeft--;
        }
        else if (Math.abs(answer.guess - originalNumber) < 20) {
            hint = chalk.blue(`Very close guess but still not right`);
            chancesLeft--;
        }
        if (chancesLeft == 0) {
            console.log(`You lost. The number I tought was ${chalk.red(originalNumber)}. Better luck next time!`);
            break;
        }
    }
    let wannaPlayMore = await inquirer.prompt({
        type: 'list',
        name: "decission",
        message: "Do you want to play more?",
        choices: [
            "Yes! why not?",
            "Nah! I'm busy"
        ]
    });
    if (wannaPlayMore.decission == "Nah! I'm busy") {
        playMore = false;
        console.log("Okay, Goodbye!");
    }
}
