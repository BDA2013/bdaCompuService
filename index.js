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
            'add a department', 'add a role', 'add an employee', 'update an employee role',
            'exit'
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

const exit = [
    {
        type: 'list',
        message: 'Do you want to exit?',
        name: 'exit',
        choices: ['yes', 'no']
    }
];


function init() {
    inquirer.prompt(mainInput)
        .then((data) => {
            switch (data.options) {
                case 'view all departments':
                    db.query(`SELECT * FROM compuService_db.department`, (err, result) => {
                        if (err) {
                            console.log(err);
                        }
                        console.log(result);
                        init();
                    });
                    break;
                case 'view all roles':
                    db.query(`SELECT * FROM compuService_db.roles`, (err, result) => {
                        if (err) {
                            console.log(err);
                        }
                        console.log(result);
                    });
                    init();
                    break;
                case 'view all employees':
                    db.query(`SELECT * FROM compuService_db.employees`, (err, result) => {
                        if (err) {
                            console.log(err);
                        }
                        console.log(result);
                    });
                    init();
                    break;
                case 'add a department':
                    inquirer.prompt(addDepartment)
                        .then((data) => {
                            db.query(`INSERT INTO compuService_db.department (name) VALUES (?)`, data.departmentName, (err, result) => {
                                if (err) {
                                    console.log(err);
                                }
                                console.log(result);
                            });
                        });
                    init();
                    break;
                case 'add a role':
                    inquirer.prompt(addRole)
                        .then((data) => {
                            db.query(`INSERT INTO compuService_db.roles (title, salary, department_id) VALUES (?, ?, ?)`, [data.roleName, data.salary, data.departmentName], (err, result) => {
                                if (err) {
                                    console.log(err);
                                }
                                console.log(result);
                            });
                        });
                    init();
                    break;
                case 'add an employee':
                    inquirer.prompt(addEmployee)
                        .then((data) => {
                            db.query(`INSERT INTO compuService_db.employees (first_name, last_name, role_id, manager_id) VALUES (?, ?, ?, ?)`, [data.employeeFirst, data.employeelast, data.role, data.department], (err, result) => {
                                if (err) {
                                    console.log(err);
                                }
                                console.log(result);
                            });
                        });
                    init();
                    break;
                case 'update an employee role':
                    inquirer.prompt(updateEmployee)
                        .then((data) => {
                            db.query(`UPDATE compuService_db.employees SET role_id = ?, manager_id = ? WHERE id = ?`, [data.role, data.department, data.id], (err, result) => {
                                if (err) {
                                    console.log(err);
                                }
                                console.log(result);
                            });
                        });
                    init();
                    break;

                case 'exit':
                    inquirer.prompt(exit)
                        .then((data) => {
                            if (data.exit === 'yes') {
                                return;
                            }
                        }
                        );
                    db.end();
                    break;

            }
        });
}

//                 inquirer.prompt(
//                     addDepartment
//                     )
//                     .then ((data) => {
//                         db.query(`INSERT INTO compuService_db.department (name) VALUES (?)`, data.departmentName, (err, result) => {
//                             if (err) {
//                               console.log(err);
//                             }
//                             console.log(result);
//                           });
//                     });
//                 break;
//             case 'add a role':
//                 //console.log(data.options);
//                 inquirer.prompt(
//                     addRole
//                     )
//                     .then ((data) => {
//                         db.query(`INSERT INTO compuService_db.roles (title, salary, department_id) VALUES (?, ?, ?)`, [data.roleName, data.salary, data.departmentName], (err, result) => {
//                             if (err) {
//                               console.log(err);
//                             }
//                             console.log(result);
//                           });
//                     });
//                 break;
//             case 'add an employee':
//                 //console.log(data.options);
//                 inquirer.prompt(
//                     addEmployee
//                     )
//                     .then ((data) => {
//                         db.query(`INSERT INTO compuService_db.employees (first_name, last_name, role_id, manager_id) VALUES (?, ?, ?, ?)`, [data.employeeFirst, data.employeelast, data.role, data.department], (err, result) => {
//                             if (err) {
//                               console.log(err);
//                             }
//                             console.log(result);
//                           });
//                     });
//                 break;
//             case 'update an employee role':
//                 //console.log(data.options);
//                 inquirer.prompt(
//                     updateEmployee
//                     )
//                     .then ((data) => {
//                         db.query(`UPDATE compuService_db.employees SET role_id = ?, manager_id = ? WHERE id = ?`, [data.role, data.department, data.id], (err, result) => {
//                             if (err) {
//                               console.log(err);
//                             }
//                             console.log(result);
//                           });
//                     });
//                 break;
//         }
//     });
// }

init()

module.exports = init;
