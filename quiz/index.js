import inquirer from "inquirer";
import chalk from "chalk";
console.clear();
console.log(chalk.bgGray(`Welcome to the Quiz Game`));
let playerDetails = await inquirer.prompt({
    type: "input",
    name: "name",
    message: "Enter your name"
});
console.clear();
console.log(chalk.bgGray(`Welcome to the Quiz Game ${playerDetails.name}`));
console.log(chalk.bgGrey(`This is going to be hard so get ready.`));
let explanations = [
    "Jimmy's father has three sons- Paul I and Paul II. Can you guess the name of the third son?\nThe right answer is Jimmy becuase we are talking about his father\n",
    "You're 4th place right now in a race. What place will you be in when you pass the person in 3rd place?\nThe right anwer is 3rd because you will be in the position of the man who you passed.\n",
    "How many months have 28 days?\nThe right answer is 12 because all months have atleast 28 days. I didn't asked which month has only 28 days.😉",
    "How many 0.5cm slices can you cut from a bread that is 25cm long?\nThe right answer is 50. Just to do the math and you'll get it (25/0.5 = 50)🔢",
    "If a leaf falls to the ground in a jungle, and no one hears it, will it make a sound?\nThe right is yes it will make a sound because it's a law of physics that some of the motion will be converted in energy.📚",
    "You have 45 apples in your basket. You take out three how many apples are left?\nThe right answer is 45 becuase you haven't eaten them yet you still have them."
];
let quizQuestions = await inquirer.prompt([
    {
        type: "list",
        name: "q1",
        message: "Jimmy's father has three sons- Paul I and Paul II. Can you guess the name of the third son?\n",
        choices: [
            "Paul III",
            "Jimmy",
            "Jerrin",
            "Paul"
        ]
    },
    {
        type: "list",
        name: "q2",
        message: "You're 4th place right now in a race. What place will you be in when you pass the person in 3rd place?\n",
        choices: [
            "1st",
            "2nd",
            "3rd",
            "4th"
        ]
    },
    {
        type: "list",
        name: "q3",
        message: "How many months have 28 days?\n",
        choices: [
            "Only 1",
            "2",
            "12",
            "0"
        ]
    },
    {
        type: "list",
        name: "q4",
        message: "How many 0.5cm slices can you cut from a bread that is 25cm long?\n",
        choices: [
            "50",
            "25",
            "20",
            "10"
        ]
    },
    {
        type: "list",
        name: "q5",
        message: "If a leaf falls to the ground in a jungle, and no one hears it, will it make a sound?\n",
        choices: [
            "Yes",
            "No",
            "Depends on the weight",
            "Depends on the place landed"
        ]
    },
    {
        type: "list",
        name: "q6",
        message: "You have 45 apples in your basket. You take out three how many apples are left?\n",
        choices: [
            "42",
            "45",
            "3",
            "48"
        ]
    }
]);
console.clear();
let gotWrong = [0, 0, 0, 0, 0, 0];
let score = 0;
if (quizQuestions.q1 == "Jimmy") {
    score++;
}
else {
    gotWrong[0]++;
}
if (quizQuestions.q2 == "3rd") {
    score++;
}
else {
    gotWrong[1]++;
}
if (quizQuestions.q3 == "12") {
    score++;
}
else {
    gotWrong[2]++;
}
if (quizQuestions.q4 == "50") {
    score++;
}
else {
    gotWrong[3]++;
}
if (quizQuestions.q5 == "Yes") {
    score++;
}
else {
    gotWrong[4]++;
}
if (quizQuestions.q6 == "45") {
    score++;
}
else {
    gotWrong[5]++;
}
if (score == 3) {
    console.log(`
        ${chalk.bgYellow("You did good! Better luck next time")}\n
        Your score is ${score}/6
    `);
}
if (score > 3) {
    console.log(`
        ${chalk.bgGreen("You were amazing man!")}\n
        Your score is ${score}/6
    `);
}
if (score < 3) {
    console.log(`
        ${chalk.bgRed("You were not good this time but try again and you'll be better")}\n
        Your score is ${score}/6
    `);
}
if (score < 6) {
    console.log(`Here are the questions you got wrong`);
    for (let i = 0; i < gotWrong.length; i++) {
        if (gotWrong[i] == 1) {
            console.log(explanations[i]);
            let j = `q${i + 1}`;
            console.log("Your answer was: " + chalk.red(quizQuestions[j]));
        }
    }
}
