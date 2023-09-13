const inquirer = require('inquirer');
const mysql = require('mysql2');
const cTable = require('console.table');

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
        type: 'list',
        message: 'Is the employee a manager?',
        name: 'manager',
        choices: ['yes', 'no']
    },

];

const manager = [
    {
        type: 'input',
        message: 'Who is the manager of the employee?',
        name: 'manager'
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


// console.log(department);

function init() {
    inquirer.prompt(mainInput)
        .then((data) => {
            switch (data.options) {
                case 'view all departments':
                    db.query(`SELECT name FROM department`, (err, result) => {
                        if (err) {
                            console.log(err);
                        } else {
                            console.table(result);
                        }
                        init();
                    });
                    break;
                case 'view all roles':
                    db.query(`SELECT roles.title, roles.salary, department.name FROM roles JOIN department ON roles.department_id = department.id `, (err, result) => {
                        if (err) {
                            console.log(err);
                        }
                        console.table(result);
                        init();
                    });
                    break;
                case 'view all employees':
                    db.query(`SELECT * FROM employee`, (err, result) => {
                        if (err) {
                            console.log(err);
                        }
                        console.table(result);
                        init();
                    });
                    break;
                case 'add a department':
                    inquirer.prompt(addDepartment)
                        .then((data) => {
                            db.query(`INSERT INTO department (name) VALUES (?)`, data.departmentName, (err, result) => {
                                if (err) {
                                    console.log(err);
                                }
                                console.log(result);
                                addDepartment.push(data.departmentName);
                            });
                            init();
                        });
                    break;
                case 'add a role':
                    db.query(`SELECT name FROM department`, (err, departments) => {
                        if (err) {
                            console.log(err);
                        }
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
                                type: 'list',
                                message: 'What department does the role belong in?',
                                name: 'departmentName',
                                choices: departments
                            }
                        ];
                        inquirer.prompt(addRole)
                            .then((data) => {
                                db.query(`SELECT id FROM department WHERE name = ?`, data.departmentName, (err, result) => {
                                    if (err) {
                                        console.log(err);
                                    }
                                    let departmentId = result[0].id;
                                    db.query(`INSERT INTO roles (title, salary, department_id) VALUES (?, ?, ?)`, [data.roleName, data.salary, departmentId], (err, result) => {
                                        if (err) {
                                            console.log(err);
                                        }
                                        console.log(result);
                                    });
                                    init();
                                });
                            });
                    });
                    break;
                case 'add an employee':
                    inquirer.prompt(addEmployee)
                        .then((data1) => {
                            if (data1.manager === 'yes') {
                                let managerId = null;
                                db.query(`SELECT name FROM department`, (err, departments) => {
                                    if (err) {
                                        console.log(err);
                                    }
                                    const departmentPosition = [
                                        {
                                            type: 'list',
                                            message: 'What department will the employee be working at?',
                                            name: 'department',
                                            choices: departments
                                        },
                                    ];
                                    inquirer.prompt(departmentPosition)
                                        .then((data2) => {
                                            db.query(`SELECT id FROM department WHERE name = ?`, data2.department, (err, id) => {
                                                if (err) {
                                                    console.log(err);
                                                }
                                                let depId = id[0].id;
                                                console.log(depId);
                                                db.query(`SELECT title FROM roles where department_id = ?;`, depId, (err, roleList) => {
                                                    if (err) {
                                                        console.log(err);
                                                    }
                                                    let roles = roleList.map((role) => role.title);
                                                    const rolePosition = [
                                                        {
                                                            type: 'list',
                                                            message: 'What role will the employee do?',
                                                            name: 'role',
                                                            choices: roles
                                                        },
                                                    ];
                                                    inquirer.prompt(rolePosition)
                                                        .then((data3) => {
                                                            db.query(`SELECT id FROM roles WHERE title = ?`, (data3), (err, role) => {
                                                                if (err) {
                                                                    console.log(err);
                                                                }
                                                                let roleId = role[1];
                                                                db.query(`INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES (?, ?, ?, ?)`, [data1.employeeFirst, data1.employeeLast, roleId, managerId], (err, result) => {
                                                                    if (err) {
                                                                        console.log(err);
                                                                    }
                                                                    console.log(result);
                                                                });
                                                            });
                                                        });
                                                });
                                            });
                                        });
                                });
                            } else {
                                inquirer.prompt(manager)
                            }

                        });
                    break;
                case 'update an employee role':
                    inquirer.prompt(updateEmployee)
                        .then((data) => {
                            db.query(`UPDATE employee SET role_id = ?, manager_id = ? WHERE id = ?`, [data.role, data.department, data.id], (err, result) => {
                                if (err) {
                                    console.log(err);
                                }
                                console.log(result);
                            });
                            init();
                        });
                    break;
                case 'exit':
                    inquirer.prompt(exit)
                        .then((data) => {
                            if (data.exit === 'yes') {
                                console.log('Goodbye');
                                process.exit();
                            } else {
                                init();
                            }
                        });
                    break;
            }
        });

}

init()

module.exports = init;
