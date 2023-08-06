import inquirer from "inquirer";
import chalk from "chalk";

console.clear();

let keepCounting : boolean = true;

console.log(chalk.bgGray("Words and Characters counting"))

while (keepCounting) {
    const answer : { text: string } = await inquirer.prompt({
        type: "input",
        name: "text",
        message: "Enter a text to count words and characters from:\n"
    });        

    let data : string = answer.text.trim();
    let a : boolean = (data == "");
    let words : number = 0;
    console.log(words)
    let characters : number = 0;
    let whitespaces : number = 0;
    console.clear();

    let n : number = answer.text.length;
    for (let i : number = 0; i < n; i++) {
        if (!a) {
            if (answer.text[i] != " ") {
                characters++;
            }
        }

        if (answer.text[i] == " ") {
            whitespaces++;
        }
    }

    if (!a) { words = 1; }

    for (let i: number = 0; i < data.length; i++) {
        if (!a) {
            if (data[i] == " " && data[i + 1] != " " && data[i + 1] != undefined) {
                words++;
            }
        }
    }
    
    console.log(chalk.bgGreen("Input Text:") + " " + answer.text);
    console.log(chalk.bgGreen("Characters:") + " " + characters);
    console.log(chalk.bgGreen("Words:") + " " +  words);
    console.log(chalk.bgGreen("Whitespaces:") + " " + whitespaces);

    let wannaKeepCounting : { decission : string } = await inquirer.prompt({
        type: 'list',
        name: "decission",
        message: "Do you want to count words and characters in another strings?",
        choices: [
            "Yes",
            "No"
        ]
    })

    if (wannaKeepCounting.decission == "No") {
        keepCounting = false;
    }
}   