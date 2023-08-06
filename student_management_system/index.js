import inquirer from "inquirer";
import chalk from "chalk";
import Student from "./Student.js";
import courses from "./courses.js";
console.clear();
let keepSMSRunning = true;
console.log(chalk.bgGray("School Management System"));
let initialId = 10001;
let students = [];
let studentsList = [];
while (keepSMSRunning) {
    console.clear();
    console.log(chalk.bgGray(`School Management System`));
    const answer = await inquirer.prompt({
        type: "list",
        name: "task",
        message: "What do you want to do?",
        choices: [
            "Create new Student",
            "Delete a Student",
            "Update a student's record",
            "Show all current Students",
            "Close the program"
        ]
    });
    switch (answer.task) {
        case "Show all current Students":
            console.clear();
            if (students.length > 0) {
                console.log("Sure!\nHere's your students list");
                studentsList = students.map(student => `${student.id}:` + ` ${student.name}`);
                let selectStudent = await inquirer.prompt({
                    type: "list",
                    name: "student",
                    message: "Select a student to see more details about him/her",
                    choices: [...studentsList]
                });
                let studentToGetDetailsOf = students.filter((student, i) => {
                    if (student.id == Number(selectStudent.student.slice(0, 5))) {
                        return true;
                    }
                    return false;
                })[0];
                let studentDetails = `Student ID: ${studentToGetDetailsOf.id}\nStudent Name: ${studentToGetDetailsOf.name}\nCourses Enrolled: ${studentToGetDetailsOf.enroll ? studentToGetDetailsOf.courseEnrolled : "Not currently enrolled in any course"}\nRemaing Fee: ${studentToGetDetailsOf.tutionFeePaid ? studentToGetDetailsOf.amountPayable : "All fee paid"}\n`;
                console.log(studentDetails);
            }
            else {
                console.log(chalk.red(`No students to show record of.`));
            }
            let asd = await inquirer.prompt({ type: "input", name: "continue", message: "Press enter key to continue..." });
            break;
        case "Create new Student":
            console.clear();
            const newStudent = await inquirer.prompt([
                {
                    type: "input",
                    name: "name",
                    message: "Student name: "
                },
            ]);
            students.push(new Student(initialId++, newStudent.name.trim(), false, "", true, 0));
            break;
        case "Delete a Student":
            console.clear();
            if (students.length > 0) {
                studentsList = students.map(student => `${student.id}: ${student.name}`);
                const studentToDelete = await inquirer.prompt({
                    type: "list",
                    name: "response",
                    message: "Okay select the task you want to delete from the below list: ",
                    choices: [...studentsList]
                });
                let newStudentsList = students.filter((student, i) => {
                    if (student.id == Number(studentToDelete.response.slice(0, 5))) {
                        return false;
                    }
                    return true;
                });
                students = [...newStudentsList];
                console.clear();
                console.log("Done Deleting!\n So here's your new Student List");
                for (let i = 0; i < students.length; i++) {
                    console.log(`${students[i].id}: ${students[i].name}`);
                }
            }
            else {
                console.log(chalk.red(`No students to delete`));
                let asd = await inquirer.prompt({ type: "input", name: "continue", message: "Press enter key to continue..." });
            }
            break;
        case "Update a student's record":
            console.clear();
            if (students.length > 0) {
                studentsList = students.map(student => `${student.id}:` + ` ${student.name}`);
                let studentToUpdate = await inquirer.prompt({
                    type: "list",
                    name: "student",
                    message: "Select student you want to update",
                    choices: [...studentsList]
                });
                let propertyToUpdate = await inquirer.prompt({
                    type: "list",
                    name: "property",
                    message: "Select the property you want to update",
                    choices: [
                        "Name",
                        "Enroll in a course",
                        "Pay fee"
                    ]
                });
                let newStudentDetails = students.filter((student, i) => {
                    if (student.id == Number(studentToUpdate.student.slice(0, 5))) {
                        return true;
                    }
                    return false;
                })[0];
                switch (propertyToUpdate.property) {
                    case "Pay fee":
                        if (newStudentDetails.tutionFeePaid) {
                            console.log(`${newStudentDetails.name}'s fee is already paid.`);
                            console.log(`Or maybe you are not enrolled in a course. Enroll first to pay your fee.`);
                        }
                        else {
                            let validInput = false;
                            while (!validInput) {
                                let fee = await inquirer.prompt({
                                    type: "number",
                                    name: "paid",
                                    message: "Your remaining fee is " + newStudentDetails.amountPayable
                                });
                                if (Number.isNaN(fee.paid)) {
                                    console.log(chalk.red(`Please enter a valid number`));
                                }
                                else if (fee.paid < 0 || fee.paid > newStudentDetails.amountPayable) {
                                    console.log(chalk.red(`Please enter an amount between 0 and ${newStudentDetails.amountPayable}`));
                                }
                                else {
                                    validInput = true;
                                    let newStudentsList = students.map((student, i) => {
                                        if (student.id == Number(studentToUpdate.student.slice(0, 5))) {
                                            student.amountPayable -= fee.paid;
                                            if (student.amountPayable == 0) {
                                                student.tutionFeePaid = true;
                                            }
                                            console.clear();
                                            console.log(chalk.green(`Your fee of ${fee.paid}$ has successfully been paid.`));
                                            return student;
                                        }
                                        return student;
                                    });
                                    students = [...newStudentsList];
                                }
                            }
                            let asd = await inquirer.prompt({ type: "input", name: "continue", message: "Press enter key to continue..." });
                        }
                        break;
                    case "Name":
                        let newName = await inquirer.prompt({
                            type: "input",
                            name: "name",
                            message: "Enter new name:"
                        });
                        let newStudentsList = students.map((student, i) => {
                            if (student.id == Number(studentToUpdate.student.slice(0, 5))) {
                                student.name = newName.name;
                                console.clear();
                                console.log(chalk.green(`Successfully changed the name from ${studentToUpdate.student.slice(5)} to ${student.name}`));
                                return student;
                            }
                            return student;
                        });
                        students = [...newStudentsList];
                        let asd = await inquirer.prompt({ type: "input", name: "continue", message: "Press enter key to continue..." });
                        break;
                    case "Enroll in a course":
                        if (studentToUpdate.enrolled) {
                            console.log(chalk.red(`Already enrolled in a course`));
                            let asd = await inquirer.prompt({ type: "input", name: "continue", message: "Press enter key to continue..." });
                        }
                        else {
                            let courseToEnrollIn = await inquirer.prompt({
                                type: "list",
                                name: "course",
                                message: "Select a course to enroll in: ",
                                choices: [...courses.map(course => course.name)]
                            });
                            let newStudentList = students.map((student, i) => {
                                if (student.id == Number(studentToUpdate.student.slice(0, 5))) {
                                    student.enroll = true;
                                    student.courseEnrolled = courseToEnrollIn.course;
                                    student.tutionFeePaid = false;
                                    student.amountPayable = courses.filter(course => course.name == courseToEnrollIn.course)[0].fee;
                                    return student;
                                }
                                return student;
                            });
                            students = [...newStudentList];
                            console.clear();
                            console.log(chalk.green(`Successfully enrolled in ${courseToEnrollIn.course}`));
                            let asd = await inquirer.prompt({ type: "input", name: "continue", message: "Press enter key to continue..." });
                        }
                        break;
                }
            }
            else {
                console.log(chalk.red(`No students to update`));
                let asd = await inquirer.prompt({ type: "input", name: "continue", message: "Press enter key to continue..." });
            }
            break;
        case "Close the program":
            keepSMSRunning = false;
    }
}
