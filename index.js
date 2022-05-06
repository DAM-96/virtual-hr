const inquirer = require("inquirer");
const { exit } = require("process");

let initialQuestion = [
    {
        type: "list",
        name: "initialOperation",
        message: "What would you like to do?",
        choices: [
            {
                name: "View all departments",
                value: "viewDepartments"
            },
            {
                name: "View all roles",
                value: "viewRoles"
            },
            {
                name: "View all employees",
                value: "viewEmployees"
            },
            {
                name: "Add a new department",
                value: "addDepartment"
            },
            {
                name: "Add a new role",
                value: "addRole"
            },
            {
                name: "Update an emplpoyee's role",
                value: "updateEmployeeRole"
            },
            {
                name: "Exit the application",
                value: "exit"
            }
        ]
    }
]

function runApp() {
    console.log(`
    __     __  __            __                         __        __    __  _______  
    |  \\   |  \\|  \\          |  \\                       |  \\      |  \\  |  \\|       \\ 
    | $$   | $$ \\$$  ______ _| $$_   __    __   ______  | $$      | $$  | $$| $$$$$$$\\
    | $$   | $$|  \\ /      \\   $$ \\ |  \\  |  \\ |      \\ | $$      | $$__| $$| $$__| $$
     \\$$\\ /  $$| $$|  $$$$$$\\$$$$$$ | $$  | $$  \\$$$$$$\\| $$      | $$    $$| $$    $$
      \\$$\\  $$ | $$| $$   \\$$| $$ __| $$  | $$ /      $$| $$      | $$$$$$$$| $$$$$$$\\
       \\$$ $$  | $$| $$      | $$|  \\ $$__/ $$|  $$$$$$$| $$      | $$  | $$| $$  | $$
        \\$$$   | $$| $$       \\$$  $$\\$$    $$ \\$$    $$| $$      | $$  | $$| $$  | $$
         \\$     \\$$ \\$$        \\$$$$  \\$$$$$$   \\$$$$$$$ \\$$       \\$$   \\$$ \\$$   \\$$
                                                                                      
                                                                                      
                                                                                      
    `);
    inquirer.prompt(initialQuestion).then( (answer) => {
        switch (answer.initialOperation) {
            case 'viewDepartments':
                true;
                break;
            case 'viewRoles':
                true;
                break;
            case 'viewEmployees':
                true;
                break;
            case 'addDepartment':
                true;
                break;
            case 'addRole':
                true;
                break;
            case 'updateEmployeeRole':
                true;
                break;
            case 'exit':
                console.log("\nExiting the application.\n\nThank you for using Virtual HR, your reliable employee management system!");
                exit(0);
            default:
                console.log("Selection out of range, exiting the application: ", answer);
                exit(1);
        }
        runApp();
    });
};

runApp();