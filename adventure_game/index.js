import inquirer from "inquirer";
import chalk from "chalk";
console.clear();
let keepPlaying = true;
console.log(chalk.bgGray("An amazing CLI based adventure game"));
let player = {
    health: 100,
    sword: "Basic",
    damage: {
        min: 1,
        max: 10,
    },
    wins: 0,
    losses: 0,
    coins: 10,
    inventory: {
        potions: 0,
        sheild: 0
    }
};
let enemies = [
    { name: "Skeleton💀", health: 100, damage: { min: 1, max: 10 } },
    { name: "Assassin🔪", health: 150, damage: { min: 10, max: 20 } },
    { name: "Zombie🧟", health: 200, damage: { min: 20, max: 30 } }
];
let playername = await inquirer.prompt({ type: "input", name: "response", message: "Enter your name" });
function findEnemy(round) {
    if (round == 1) {
        return enemies[0];
    }
    else if (round == 2) {
        return enemies[1];
    }
    else {
        return enemies[2];
    }
}
let errorMessage = chalk.bgGrey("Pro Tip: Buy a good sword before playing");
while (keepPlaying) {
    player.health = 100;
    console.clear();
    console.log(chalk.bgGray("An amazing CLI based adventure game"));
    console.log(chalk.bgGreen(`${playername.response}'s Health❤️:`) + ` ${player.health}`);
    console.log(chalk.bgGreen(`${playername.response}'s Coins🟡:`) + ` ${player.coins}`);
    console.log(chalk.bgGreen(`${playername.response}'s Potions🧪:`) + ` ${player.inventory.potions}`);
    console.log(chalk.bgGreen(`${playername.response}'s Shields🛡️:`) + ` ${player.inventory.sheild}`);
    console.log(chalk.bgGreen(`${playername.response}'s Sword⚔️:`) + ` ${player.sword}`);
    console.log(chalk.bgGreen(`${playername.response}'s Wins🏆:`) + ` ${player.losses}`);
    console.log(chalk.bgGreen(`${playername.response}'s Losses❌:`) + ` ${player.wins}`);
    console.log(errorMessage);
    let whatToDo = await inquirer.prompt({
        type: "list",
        name: "what_to_do",
        message: "What you want to do?",
        choices: [
            "Enter a fight",
            "Enter store",
            "Close the game"
        ]
    });
    errorMessage = "";
    switch (whatToDo.what_to_do) {
        case "Enter a fight":
            for (let i = 1; i <= 3; i++) {
                let enemy = findEnemy(i);
                console.clear();
                console.log(chalk.bgRed(`Oh no! It's ${enemy.name}`));
                while (enemy.health > 0 && player.health > 0) {
                    console.log(chalk.bgGreen("Let's begin the fight"));
                    if (player.inventory.sheild > 0) {
                        let wearShield = await inquirer.prompt({
                            type: "list",
                            name: "decission",
                            message: `You have ${player.inventory.sheild} Sheilds. Do you want use one?`,
                            choices: [
                                "Yes",
                                "No"
                            ]
                        });
                        if (wearShield.decission == "Yes") {
                            player.health += 50;
                            player.inventory.sheild--;
                            console.log(`You have used shield. Your health is now ${player.health}`);
                        }
                    }
                    let playerMove = await inquirer.prompt({
                        type: "list",
                        name: "decission",
                        message: "What's your move now?",
                        choices: [
                            "Attack",
                            "Run from the fight",
                            "Drink potion🧪"
                        ]
                    });
                    if (playerMove.decission == "Run from the fight") {
                        player.health = 100;
                        enemies = enemies.map(enemy => { enemy.health = 50 * (i + 1); return enemy; });
                        i = 4;
                        break;
                    }
                    else if (playerMove.decission == "Drink potion🧪") {
                        if (player.inventory.potions > 0) {
                            player.inventory.potions--;
                            player.health += 50;
                        }
                        else {
                            console.log(chalk.red(`You don't have health potions. Buy them from the store.`));
                        }
                    }
                    else if (playerMove.decission == "Attack") {
                        let damageByPlayer = Math.floor((Math.random() * player.damage.max) + player.damage.min);
                        let damageByEnemy = Math.floor((Math.random() * enemy.damage.max) + enemy.damage.min);
                        player.health -= damageByEnemy;
                        enemy.health -= damageByPlayer;
                        console.log(`You've attacked. You recieved a damage of ${damageByEnemy} and you did a damage of ${damageByPlayer}`);
                        if (player.health < 1) {
                            player.health = 0;
                        }
                        if (enemy.health < 1) {
                            enemy.health = 0;
                        }
                        console.log(chalk.green(`Your health: ${player.health}`));
                        console.log(chalk.red(`${enemy.name}'s health: ${enemy.health} `));
                    }
                }
                if (enemy.health < 1) {
                    if (enemy.name == "Zombie🧟") {
                        errorMessage = chalk.green(`Congratulation ${playername.response}! You won🏆.\nYou have earned 1000 coins🟡`);
                        player.coins += 1000;
                    }
                    console.clear();
                    if (enemy.name != "Zombie🧟") {
                        console.log(chalk.green(`Yes! you defeated ${enemy.name}.`));
                        console.log(chalk.green(`You also earned ${i * 50} coins🟡 and won ${i} health potion.`));
                        player.coins += i * 50;
                        player.inventory.potions += i;
                        let playMore = await inquirer.prompt({
                            type: "list",
                            name: "decission",
                            message: `You are now all set for round ${i + 1}.`,
                            choices: [
                                `Proceed to round ${i + 1}`,
                                "Return to main menu"
                            ]
                        });
                        if (playMore.decission == "Return to main menu") {
                            player.health = 100;
                            enemies = enemies.map(enemy => { enemy.health = 50 * (i + 1); return enemy; });
                            i = 4;
                            break;
                        }
                    }
                }
                else if (player.health < 1) {
                    errorMessage = chalk.red(`Sorry you died. Game ends here`);
                    player.health = 100;
                    enemies = enemies.map(enemy => { enemy.health = 50 * (i + 1); return enemy; });
                    i = 4;
                    break;
                }
                else if (player.health < 1 && enemy.health < 1) {
                    errorMessage = chalk.red(`You both died. Game ends here`);
                    player.health = 100;
                    enemies = enemies.map(enemy => { enemy.health = 50 * (i + 1); return enemy; });
                    i = 4;
                    break;
                }
            }
            break;
        case "Enter store":
            console.clear();
            let storeItem = await inquirer.prompt({
                type: "list",
                name: "response",
                message: "Select an item to buy",
                choices: [
                    "Health Potion (10 Coins)🧪",
                    "Shield (50 Coins)🛡️",
                    "Swords⚔️"
                ]
            });
            switch (storeItem.response) {
                case "Health Potion (10 Coins)🧪":
                    if (player.coins >= 10) {
                        player.coins -= 10;
                        player.inventory.potions++;
                    }
                    else {
                        errorMessage = chalk.red(`Sorry you don't have enough coins. Back to main menu.`);
                    }
                    break;
                case "Shield (50 Coins)🛡️":
                    if (player.coins >= 50) {
                        player.coins -= 50;
                        player.inventory.sheild++;
                    }
                    else {
                        errorMessage = chalk.red(`Sorry you don't have enough coins. Back to main menu.`);
                    }
                    break;
                case "Swords⚔️":
                    let swordToBuy = await inquirer.prompt({
                        type: "list",
                        name: "decission",
                        message: "Select a sword to buy",
                        choices: [
                            "Basic (0 coins)",
                            "Silver (10 coins)",
                            "Gold (20 coins)",
                            "Diamond (30 coins)"
                        ]
                    });
                    switch (swordToBuy.decission) {
                        case "Basic (0 coins)":
                            if (player.coins >= 0) {
                                player.coins -= 0;
                                player.sword = "Basic";
                                player.damage.min = 1;
                                player.damage.max = 10;
                                console.log(chalk.green(`You've brought a ${player.sword} Sword now you can make a damage of 0-10`));
                            }
                            else {
                                errorMessage = chalk.red(`Sorry you don't have enough coins. Back to main menu.`);
                            }
                            break;
                        case "Silver (10 coins)":
                            if (player.coins >= 10) {
                                player.coins -= 10;
                                player.sword = "Silver";
                                player.damage.min = 10;
                                player.damage.max = 20;
                                errorMessage = chalk.green(`You've brought a ${player.sword} Sword now you can make a damage of 10-20`);
                            }
                            else {
                                errorMessage = chalk.red(`Sorry you don't have enough coins. Back to main menu.`);
                            }
                            break;
                        case "Gold (20 coins)":
                            if (player.coins >= 20) {
                                player.coins -= 20;
                                player.sword = "Gold";
                                player.damage.min = 20;
                                player.damage.max = 30;
                                errorMessage = chalk.green(`You've brought a ${player.sword} Sword now you can make a damage of 20-30`);
                            }
                            else {
                                errorMessage = chalk.red(`Sorry you don't have enough coins. Back to main menu.`);
                            }
                            break;
                        case "Diamond (30 coins)":
                            if (player.coins >= 30) {
                                player.coins -= 30;
                                player.sword = "Diamond";
                                player.damage.min = 30;
                                player.damage.max = 40;
                                errorMessage = chalk.green(`You've brought a ${player.sword} Sword now you can make a damage of 30-40`);
                            }
                            else {
                                errorMessage = chalk.red(`Sorry you don't have enough coins. Back to main menu.`);
                            }
                            break;
                    }
                    break;
            }
            break;
        case "Close the game":
            console.clear();
            keepPlaying = false;
            break;
    }
}
