// Import and require mysql2
const mysql = require('mysql2');
const inquirer = require('inquirer');

// Connect to database
const db = mysql.createConnection(
    {
        host: 'localhost',
        // MySQL username,
        user: 'root',
        // TODO: Add MySQL password here
        password: "12345678",
        database: 'employee_db'
    },
    console.log(`Connected to the employee_db database.`)
);

db.connect(function (err) {
    if (err) throw err;
    console.log("Connected!");
});

function mainMenu() {
    inquirer.prompt({
        name: "action",
        type: "list",
        message: "What would you like to do?",
        choices: [
            "View all employees",
            "Add employee",
            "Update employee role",
            "View all roles",
            "Add role",
            "View all departments",
            "Add department",
            "Quit"
        ]
    }).then(function (answer) {
        switch (answer.action) {
            case "View all employees":
                viewAllEmployees();
                break;
            case "Add employee":
                addEmployee();
                break;
            case "Update employee role":
                updateEmployeeRole();
                break;
            case "View all roles":
                viewAllRoles();
                break;
            case "Add role":
                addRole();
                break;
            case "View all departments":
                viewAllDepartments();
                break;
            case "Add department":
                addDepartment();
                break;
            case "Quit":
                quit();
                break;
        }
    });
}

function viewAllEmployees() {
    db.query("SELECT * FROM employee", function (err, res) {
        if (err) throw err;
        console.table(res);
        mainMenu();
    });
}

function addEmployee() {
    inquirer.prompt([
        {
            name: "first_name",
            type: "input",
            message: "What is the employee's first name?"
        },
        {
            name: "last_name",
            type: "input",
            message: "What is the employee's last name?"
        },
        {
            name: "role_id",
            type: "input",
            message: "What is the employee's role ID?"
        },
        {
            name: "manager_id",
            type: "input",
            message: "What is the employee's manager ID?"
        }
    ]).then(function (answer) {
        db.query("INSERT INTO employee SET ?",
            {
                first_name: answer.first_name,
                last_name: answer.last_name,
                role_id: answer.role_id,
                manager_id: answer.manager_id
            },
            function (err) {
                if (err) throw err;
                console.log("Employee added successfully!");
            }
        );
        mainMenu();
    });
}

function updateEmployeeRole() {
    inquirer.prompt([
        {
            name: "employee_id",
            type: "input",
            message: "What is the employee's ID?"
        },
        {
            name: "role_id",
            type: "input",
            message: "What is the employee's new role ID?"
        }
    ]).then(function (answer) {
        db.query("UPDATE employee SET ? WHERE ?",
            [
                {
                    role_id: answer.role_id
                },
                {
                    id: answer.employee_id
                }
            ],
            function (err) {
                if (err) throw err;
                console.log("Employee role updated successfully!");
            }
        );
        mainMenu();
    });
}

function viewAllRoles() {
    db.query("SELECT * FROM role", function (err, res) {
        if (err) throw err;
        console.table(res);
        mainMenu();
    });
}

function addRole() {
    inquirer.prompt([
        {
            name: "title",
            type: "input",
            message: "What is the role's title?"
        },
        {
            name: "salary",
            type: "input",
            message: "What is the role's salary?"
        },
        {
            name: "department_id",
            type: "input",
            message: "What is the role's department ID?"
        }
    ]).then(function (answer) {
        db.query("INSERT INTO role SET ?",
            {
                title: answer.title,
                salary: answer.salary,
                department_id: answer.department_id
            },
            function (err) {
                if (err) throw err;
                console.log("Role added successfully!");
            }
        );
        mainMenu();
    });
}

function viewAllDepartments() {
    db.query("SELECT * FROM department", function (err, res) {
        if (err) throw err;
        console.table(res);
        mainMenu();
    });
}

function addDepartment() {
    inquirer.prompt([
        {
            name: "name",
            type: "input",
            message: "What is the department's name?"
        }
    ]).then(function (answer) {
        db.query("INSERT INTO department SET ?",

            {
                name: answer.name
            },
            function (err) {
                if (err) throw err;
                console.log("Department added successfully!");
            }
        );
        mainMenu();
    });
}

function quit() {
    console.log("Goodbye!");
    process.exit();
}



mainMenu();