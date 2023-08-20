const inquirer = require("inquirer");
// Import and require mysql2
const mysql = require('mysql2');
// import library to format tables
const cTable = require('console.table');


let updated_dept_list = [];
let updated_role_list = [];
let updated_empl_list = [];

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
                choices: ["View all departments", "View all roles", "view all employees", new inquirer.Separator(), "Add a department", "Add a role", "Add an employee", new inquirer.Separator(), "Udpate an employee role", new inquirer.Separator(), "Exit", new inquirer.Separator()]
            }
        ]).then((res) => {
            console.log(res);
            displayData(res.selection);
            

        });
}

function displayData(userChoice) {
    fetchLatestData();
    switch (userChoice) {
        case "View all departments":
            db.query('SELECT id, name AS departments FROM department;', function (err, results) {
                console.table(results);
                askToContinue();
            });
            break;
        case "View all roles":
            db.query(`SELECT r.id, r.title AS job_role, r.salary, d.name as department
            FROM role AS r
            JOIN department AS d 
            ON r.department_id = d.id;`, function (err, results) {
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
        case "Add a department":
            inquirer
                .prompt([
                    {
                        type: "input",
                        message: "What is the name of the new Department?",
                        name: "newDepartment"
                    }]).then((res) => {
                        console.log(res);
                        db.query(`INSERT INTO department(name)
                        VALUE ("${res.newDepartment}");`);
                        db.query('SELECT id, name AS departments FROM department;', function (err, results) {
                            console.table(results);
                            askToContinue();
                        });
                    });
            break;
        case "Add a role":
            inquirer
                .prompt([
                    {
                        type: "input",
                        message: "What is the name of the new Role?",
                        name: "newRole"
                    },
                    {
                        type: "number",
                        message: "What is the salary?",
                        name: "salary"
                    },
                    {
                        type: "list",
                        message: "What is the department?",
                        name: "department",
                        choices: updated_dept_list
                    }
                ]).then((res) => {
                    const dep_id = (updated_dept_list.indexOf(res.department))+ 1;
                    db.query(`INSERT INTO role(title, salary, department_id)
                        VALUE ("${res.newRole}", "${res.salary}", "${dep_id}");`);
                    db.query(`SELECT r.id, r.title AS job_role, r.salary, d.name as department
                    FROM role AS r
                    JOIN department AS d 
                    ON r.department_id = d.id;`, function (err, results) {
                        console.table(results);
                        askToContinue();
                    });
                });
            break;
        case "Add an employee":
            inquirer
                .prompt([
                    {
                        type: "input",
                        message: "What is the first name of the new employee?",
                        name: "firstName"
                    },
                    {
                        type: "input",
                        message: "What is the last name of the new employee?",
                        name: "lastName"
                    },
                    {
                        type: "list",
                        message: "What is the employee role?",
                        name: "role",
                        choices: updated_role_list
                    },
                    {
                        type: "list",
                        message: "What is the name of its manager?",
                        name: "manager",
                        choices:  updated_empl_list
                    }
                ]).then((res) => {
                    console.log(res);
                    const role_id = (updated_role_list.indexOf(res.role))+ 1;
                    const manager_id = (updated_empl_list.indexOf(res.manager))+ 1;
                    db.query(`INSERT INTO employee(first_name, last_name,role_id,manager_id)
                        VALUE ("${res.firstName}", "${res.lastName}", "${role_id}","${manager_id}");`);
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
                });
            break;
        case "Udpate an employee role":
            inquirer
                .prompt([
                    {
                        type: "list",
                        message: "Select Employee",
                        name: "employee",
                        choices: updated_empl_list
                    },
                    {
                        type: "list",
                        message: "What is the new role of the employee?",
                        name: "newRole",
                        choices: updated_role_list
                    },
                ]).then((res) => {

                    const empl_id = (updated_empl_list.indexOf(res.employee))+ 1;
                    const role_id = (updated_role_list.indexOf(res.newRole))+ 1;
                    db.query(`UPDATE employee SET role_id = ${role_id} WHERE id = ${empl_id}`);
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


async function fetchLatestData(){
   await fetchDepartments();
   await fetchRoles();
   await fetchEmployees();
}

function fetchDepartments() {
    updated_dept_list =[]; 
    db.query('SELECT name FROM department;', function (err, results) {
     results.forEach(element => {
        updated_dept_list.push(element.name);
        });
        return updated_dept_list;
    });
}

function fetchRoles(){
    updated_role_list =[]; 
    db.query('SELECT title FROM role;', function (err, results) {
     results.forEach(element => {
        updated_role_list.push(element.title);
        });
        return updated_role_list;
    });
}

function fetchEmployees(){
    updated_empl_list =[]; 
    db.query('SELECT first_name, last_name FROM employee;', function (err, results) {
     results.forEach(element => {
        updated_empl_list.push(`${element.first_name} ${element.last_name}`);
        });
        return updated_empl_list;
    });
}

fetchLatestData();
mainMenu();
