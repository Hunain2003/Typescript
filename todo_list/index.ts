import inquirer from "inquirer";
import chalk from "chalk";
import fs from "fs";
import path from 'path';
import { fileURLToPath } from 'url';

console.clear();

let keepTodoRunning : boolean = true;

let moreCalculations = true;

console.log(chalk.bgGray("An amazing Todo App"))

let tasks : string[] = [];

let iteration : number = 0;

let addMore : boolean = true;

while (keepTodoRunning) {
    console.log(chalk.bgGreen("Your current todo list is empty"));
    
    let done : boolean = false;
    let toMessage : string = (iteration == 0) ? "First add a task to your list" : "Okay name the task";

    if (addMore) {
        const answer : { task: string } = await inquirer.prompt({
            type: "input",
            name: "task",
            message: toMessage
        });

        tasks.push(answer.task)
    }
        

    let whatToDo = await inquirer.prompt({
        type: "list",
        name: "what_to_do",
        message: "Now tell me what you want to do?",
        choices: [
            "Show me the current list",
            "Add a task",
            "Delete a task",
            "Nothing just print my list and exit"
        ]
    })

    console.clear();

    switch (whatToDo.what_to_do) {
        case "Show me the current list":
            console.clear();
            console.log("Sure!\nHere's your Todo List")
            for (let i : number = 0; i < tasks.length; i++) { console.log(`Task ${i}: ${tasks[i]}`) }
            break;
        case "Add a task":
            console.clear();
            const newTask: { newTask: string } = await inquirer.prompt({
                type: "input",
                name: "newTask",
                message: "Okay what task?: "
            });

            tasks.push(newTask.newTask)
            break;
        case "Delete a task":
            console.clear();
            const taskToDelete : { response: string } = await inquirer.prompt({
                type: "list",
                name: "response",
                message: "Okay select the task you want to delete from the below list: ",
                choices: [...tasks]
            });

            let itemToDelete = tasks.indexOf(taskToDelete.response);
            
            let newTasksList = tasks.filter((task, i) => {
                if (i == itemToDelete) {
                    return false;
                }

                return true;
            })
            
            tasks = [...newTasksList]
            console.clear();
            console.log("Sure!\n So here's your new Todo List")
            for (let i : number = 0; i < tasks.length; i++) { console.log(`Task ${i}: ${tasks[i]}`) }
            break;
        case "Nothing just print my list and exit":
            console.clear();
            
            let filename : string = "todo"

            const __filename = fileURLToPath(import.meta.url);
            const __dirname = path.dirname(__filename);

            fs.writeFile(`${__dirname}/${filename}.txt`, tasks.join('\n'), err => {
                if (err) {
                  console.error(`Sorry something went wrong. Please try again. Here's the log of what happened: ${err}`);
                }
                console.log(`I have writen your todo list in a file named ${filename}.txt.`)
                console.log(`Print your file now from your printer.`)
                console.log(`I am also exiting the program. Goodbye friend!`)
            });
            done = true;
            break;
    }

    if (done === true) {
        break;
    }

    let wannaAddMore : { decission : string } = await inquirer.prompt({
        type: 'list',
        name: "decission",
        message: "Do you want to add more tasks in the list?",
        choices: [
            "I want to add more items in the list",
            "I want to delete or print my list",
            "Close the program"
        ]
    })

    iteration++;
    
    
    if (wannaAddMore.decission == "I want to delete or print my list") {
        addMore = false;
    }
    
    else if (wannaAddMore.decission == "I want to add more items in the list") {
        addMore = true
    }
    
    else if (wannaAddMore.decission == "Close the program") {
        keepTodoRunning = false;
        console.log("Okay, Goodbye!");
    }
}   