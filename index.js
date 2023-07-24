const inquirer = require('inquirer');
const mysql = require('mysql2');

const db = mysql.createConnection(
    {
      host: 'localhost',
      // MySQL username,
      user: 'root',
      // MySQL password
      password: '',
      database: 'compuService_db'
    },
    console.log(`Connected to the CompuService database.`)
  );

const mainInput = [
    {
        type: 'list',
        message: 'What is your option?',
        name: 'options',
        choices: ['view all departments', 'view all roles', 'view all employees', 
                  'add a department', 'add a role', 'add an employee', 'update an employee role'
                ]
    }
];

const addDepartment = [
    {
        type: 'input',
        message: 'What is the name of the department?',
        name: 'departmentName'
    }
];

const addEmployee = [
    {
        type: 'input',
        message: 'What is the first name of the employee?',
        name: 'employeeFirst'
    },
    {
        type: 'input',
        message: 'What is the last name of the employee?',
        name: 'employeelast'
    },
    {
        type: 'input',
        message: 'What department will the employee be working at?',
        name: 'department'
    },
    {
        type: 'input',
        message: 'What role will the employee do?',
        name: 'role'
    }
];

const addRole = [
    {
        type: 'input',
        message: 'What is the name of the new role?',
        name: 'roleName'
    },
    {
        type: 'input',
        message: 'What is the salary of the role?',
        name: 'salary'
    },
    {
        type: 'input',
        message: 'Which department will the role be added to?',
        name: 'departmentName'
    }
];

const updateEmployee = [
    {
        type: 'input',
        message: 'What is the id of the employee?',
        name: 'id'
    },
    {
        type: 'input',
        message: 'What department will the employee be working at?',
        name: 'department'
    },
    {
        type: 'input',
        message: 'What role will the employee do?',
        name: 'role'
    }
];

function init() {
    inquirer.prompt(
        mainInput
        )
        .then ((data) => {
            //console.log(data.options);
            switch (data.options) {
                case 'view all departments':
                    //console.log(data.options);
                    db.query(`SELECT * FROM departments`, (err, result) => {
                        if (err) {
                          console.log(err);
                        }
                        console.log(result);
                      });
                    break;
                case 'view all roles':
                    //console.log(data.options);
                    db.query(`SELECT * FROM roles`, (err, result) => {
                        if (err) {
                          console.log(err);
                        }
                        console.log(result);
                      });
                    break;
                case 'view all employees':
                    //console.log(data.options);
                    db.query(`SELECT * FROM employees`, (err, result) => {
                        if (err) {
                          console.log(err);
                        }
                        console.log(result);
                      });
                    break;
                case 'add a department':
                    //console.log(data.options);
                    inquirer.prompt(
                        addDepartment
                        )
                        .then ((data) => {});
                    break;
                case 'add a role':
                    //console.log(data.options);
                    inquirer.prompt(
                        addRole
                        )
                        .then ((data) => {});
                    break;
                case 'add an employee':
                    //console.log(data.options);
                    inquirer.prompt(
                        addEmployee
                        )
                        .then ((data) => {});
                    break;
                case 'update an employee role':
                    //console.log(data.options);
                    inquirer.prompt(
                        updateEmployee
                        )
                        .then ((data) => {});
                    break;
            }
        });
}

init()

module.exports = init;
