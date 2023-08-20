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

    switch (userChoice) {
        case "View all departments":
            db.query('SELECT id, name AS departments FROM department;', function (err, results) {
                console.table(results);
                askToContinue();
            });
            break;
        case "View all roles":
            db.query('SELECT id, title AS role, salary, department_id FROM role;', function (err, results) {
                console.table(results);
                askToContinue();
            });
            break;
        case "view all employees":
            db.query(`SELECT e.id, e.first_name, e.last_name, r.title, r.salary, d.name as department, ee.first_name as manager_name
                FROM employee as e
                JOIN role as r
                on r.id = e.role_id
                JOIN department as d
                on d.id = r.department_id
                LEFT JOIN employee as ee
                on e.manager_id = ee.id`, function (err, results) {
                console.table(results);
                askToContinue();
            });
            break;
        default:
            process.exit(0);
    }




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