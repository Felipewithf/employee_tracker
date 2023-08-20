const inquirer = require("inquirer");
// Import and require mysql2
const mysql = require('mysql2');


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

inquirer
.prompt([
    {
        type: "list",
        message: "What would you like to do?",
        name: "shapes",
        choices: ["View all departments", "View all roles", "view all employees", new inquirer.Separator(), "Add a department", "Add a role","Add an employee", new inquirer.Separator(), "Udpate an employee role", new inquirer.Separator()]
    }
]).then((res) =>{
    console.log(res);
});
