const inquirer = require("inquirer");
// Import and require mysql2
const mysql = require('mysql2');
// import library to format tables
const cTable = require('console.table');


console.log(`
███████ ███    ███ ██████  ██       ██████  ██    ██ ███████ ███████ 
██      ████  ████ ██   ██ ██      ██    ██  ██  ██  ██      ██      
█████   ██ ████ ██ ██████  ██      ██    ██   ████   █████   █████   
██      ██  ██  ██ ██      ██      ██    ██    ██    ██      ██      
███████ ██      ██ ██      ███████  ██████     ██    ███████ ███████ 
                                                                     
                                                                     
██████   █████  ████████  █████  ██████   █████  ███████ ███████     
██   ██ ██   ██    ██    ██   ██ ██   ██ ██   ██ ██      ██          
██   ██ ███████    ██    ███████ ██████  ███████ ███████ █████       
██   ██ ██   ██    ██    ██   ██ ██   ██ ██   ██      ██ ██          
██████  ██   ██    ██    ██   ██ ██████  ██   ██ ███████ ███████     
                                                                     
                                                                                                                                                   
`);

// Connect to database
const db = mysql.createConnection(
    {
        host: 'localhost',
        user: 'root',
        password: 'holafo$1515',
        database: 'employees_db'
    },
    console.log(`Connected to the employee_db database.`)
);

const mainMenu = () => {

    inquirer
        .prompt([
            {
                type: "list",
                message: "What would you like to do?",
                name: "selection",
                choices: ["View all departments", "View all roles", "view all employees", new inquirer.Separator(), "Add a department", "Add a role", "Add an employee", new inquirer.Separator(), "Udpate an employee role", new inquirer.Separator()]
            }
        ]).then((res) => {
            console.log(res);
            displayData(res.selection);

        });
}

function displayData(userChoice) {

    db.query('SELECT id, name AS departments FROM department;', function (err, results) {
        console.table(results);
        askToContinue();
    });

   

}

function askToContinue() {
    inquirer
        .prompt([
            {
                type: "confirm",
                message: "Back to Main Menu?",
                name: "continue"
            }
        ]).then((res) => {
            if (!res.continue) {
                process.exit(0);
            }
            mainMenu();
        });
}

mainMenu();