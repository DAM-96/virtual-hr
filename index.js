const dbConnection = require("./server");
const inquirer = require("inquirer");
const { exit } = require("process");
const { queries, bases } = require("./queries");
const tableView = require("console.table")

const dbQuestions = [
    {
        type: "input",
        name: "username",
        message: "Input your SQL username: ",
        default: "root"
    },
    {
        type: "password",
        name: "password",
        message: "Type your SQL password: "
    }
]
const initialQuestion = [
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
                name: "Add a new employee",
                value: "addEmployee"
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

let rebase = false;
let seed = false;
let connection;

function runApp() {
    console.log("\n");
    inquirer.prompt(initialQuestion).then( (answer) => {

        // Define data acquisition inquiries
        let reqData = {
            department: [
                {
                    type: "input",
                    name: "department",
                    message: "Input the name of the new department: ",
                }
            ],
            role: 
            [
                    {
                        type: "input",
                        name: "title",
                        message: "Input the name of the new position: ",
                    },
                    {
                        type: "number",
                        name: "salary",
                        message: "Input the salary for this position: ",
                    },
                    {
                        type: "list",
                        name: "department",
                        message: "To which department does this position belongs to? ",
                        choices:  getDepartmentsForPrompt()
                    }
            ],
            employee: [
                {
                    type: "input",
                    name: "firstName",
                    message: "Input the fisrt name of the new employee: ",
                },
                {
                    type: "input",
                    name: "lastName",
                    message: "Input the last name of the new employee: ",
                },
                {
                    type: "list",
                    name: "role",
                    message: "What position will the new employee hold? ",
                    choices: getRolesForPrompt()
                },
                {
                    type: "list",
                    name: "manager",
                    message: "Who will be the user's manager? ",
                    choices: getPeopleForPrompt()
                }
            ]
        }

        // Process decisions
        switch (answer.initialOperation) {
            case 'viewDepartments':
                viewTable(queries.departments.view);
                break;
            case 'viewRoles':
                viewTable(queries.roles.view);
                break;
            case 'viewEmployees':
                viewTable(queries.employees.view);
                break;
            case 'addDepartment':
                inquirer.prompt(reqData.department).then( (results)=> {
                    addData(queries.departments, results);
                });
                break;
            case 'addRole':
                inquirer.prompt(reqData.role).then( (results)=> {
                    addData(queries.roles, results);
                });
                break;
            case 'addEmployee':
                inquirer.prompt(reqData.employee).then( (results)=> {
                    addData(queries.employees, results);
                });
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

async function getTable(dbQuery) {
    return await connection.deliverQueryPromise(dbQuery);
}

async function viewTable(dbQuery) {
    const data = await getTable(dbQuery);
    displayTable(data);
}

async function displayTable(rows){
    console.log("\n\n");
    console.table(rows);
    console.log("\n\n");
}

async function addData(dbQueryObj, inquirerData) {
    let sqlSettings = []
    switch (dbQueryObj.name) {
        case bases.departments:
            sqlSettings.push(inquirerData.department)
            await connection.deliverQueryPromise(dbQueryObj.add, sqlSettings);
            break;
        case bases.roles:
            sqlSettings.push(inquirerData.title);
            sqlSettings.push(inquirerData.salary);
            sqlSettings.push(inquirerData.department);
            break;
        case bases.employees:
            sqlSettings.push(inquirerData.firstName);
            sqlSettings.push(inquirerData.lastName);
            sqlSettings.push(inquirerData.role);
            sqlSettings.push(inquirerData.manager);
            break;
        default:
            break;
    }
    await connection.deliverQueryPromise(dbQueryObj.add, sqlSettings);
}

async function getDepartmentsForPrompt() {
    let rawDeptData = await getTable(queries.departments.view);
    let outputArray = [];
    for ( let i = 0; i < rawDeptData.length; i++) {
        let tempDataObj = {
            name: rawDeptData[i].name,
            value: rawDeptData[i].id
        }
        outputArray.push(tempDataObj);
    }
    return outputArray;
}

async function getRolesForPrompt() {
    let rawDeptData = await getTable(queries.roles.view);
    let outputArray = [];
    for ( let i = 0; i < rawDeptData.length; i++) {
        let tempDataObj = {
            name: rawDeptData[i].title,
            value: rawDeptData[i].id
        }
        outputArray.push(tempDataObj);
    }
    return outputArray;
}

async function getPeopleForPrompt() {
    let rawDeptData = await getTable(queries.employees.view);
    let outputArray = [];
    for ( let i = 0; i < rawDeptData.length; i++) {
        let tempDataObj = {
            name: `${rawDeptData[i].first_name} ${rawDeptData[i].last_name}`,
            value: rawDeptData[i].id
        }
        outputArray.push(tempDataObj);
    }
    tempDataObj = {
        name: "None",
        value: "NULL"
    }
    outputArray.push(tempDataObj);
    return outputArray;
}

function startApp(){
    const args = process.argv.slice(2);
    if( args.indexOf("rebase") != -1) rebase =true;
    if (args.indexOf("seed") != -1) seed = true;
    inquirer.prompt(dbQuestions).then( (dbRes) => {
        connection = new dbConnection(dbRes.username, dbRes.password, seed, rebase);
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
        runApp();
    });
}

startApp()