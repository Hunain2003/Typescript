import inquirer from "inquirer";
import chalk from "chalk";
console.clear();
console.log(chalk.bgGray(`Welcome to the countdown Timer`));
let validInput = false;
let setTime = { hours: 0, minutes: 0, seconds: 0 };
while (!validInput) {
    let targetTime = await inquirer.prompt([
        {
            type: "number",
            name: "hours",
            message: "Enter hours: "
        },
        {
            type: "number",
            name: "minutes",
            message: "Enter minutes: "
        },
        {
            type: "number",
            name: "seconds",
            message: "Enter seconds: "
        }
    ]);
    if (targetTime.seconds < 60 || targetTime.minutes < 60) {
        validInput = true;
        setTime = targetTime;
    }
    else {
        console.log(chalk.red(`Please set seconds/minutes between 0 and 59 inclusive`));
    }
}
console.clear();
function startCountdown(duration) {
    let remainingTime = duration;
    const interval = setInterval(() => {
        const hours = Math.floor(remainingTime / 60 / 60);
        const minutes = Math.floor(remainingTime / 60);
        const seconds = remainingTime % 60;
        if (hours == 0 && minutes == 0 && seconds < 60) {
            process.stdout.write(chalk.red(`Time remaining: ${hours < 10 ? '0' : ''}${hours}:${seconds < 10 ? '0' : ''}${minutes}:${seconds < 10 ? '0' : ''}${seconds}\r`));
        }
        else {
            process.stdout.write(chalk.green(`Time remaining: ${hours < 10 ? '0' : ''}${hours}:${seconds < 10 ? '0' : ''}${minutes}:${seconds < 10 ? '0' : ''}${seconds}\r`));
        }
        if (remainingTime <= 0) {
            clearInterval(interval);
            console.log(chalk.bgGreen('\nCountdown finished!'));
        }
        remainingTime--;
    }, 1000);
}
const countdownDuration = (setTime.hours * 60 * 60) + (setTime.minutes * 60) + setTime.seconds; // 5 minutes in seconds
startCountdown(countdownDuration);
