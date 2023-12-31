const inquirer = require("inquirer");
const mysql = require("mysql2");
const cTable = require("console.table");

const db = mysql.createConnection(
  {
    host: "localhost",
    // MySQL username,
    user: "root",
    // MySQL password
    password: "",
    database: "compuService_db",
  },
  console.log(`Connected to the CompuService database.`)
);

const mainInput = [
  {
    type: "list",
    message: "What is your option?",
    name: "options",
    choices: [
      "view all departments",
      "view all roles",
      "view all employees",
      "add a department",
      "add a role",
      "add an employee",
      "update an employee role",
      "exit",
    ],
  },
];

const addDepartment = [
  {
    type: "input",
    message: "What is the name of the department?",
    name: "departmentName",
  },
];

const addEmployee = [
  {
    type: "input",
    message: "What is the first name of the employee?",
    name: "employeeFirstName",
  },
  {
    type: "input",
    message: "What is the last name of the employee?",
    name: "employeeLastName",
  },
  {
    type: "list",
    message: "Is the employee a manager?",
    name: "manager",
    choices: ["yes", "no"],
  },
];

const manager = [
  {
    type: "input",
    message: "What is the first name of the manager?",
    name: "managerFirstName",
  },
  {
    type: "input",
    message: "What is the last name of the manager?",
    name: "managerLastName",
  },
];

const exit = [
  {
    type: "list",
    message: "Do you want to exit?",
    name: "exit",
    choices: ["yes", "no"],
  },
];

function init() {
  inquirer.prompt(mainInput).then((data) => {
    switch (data.options) {
      // View all departments
      case "view all departments":
        db.query(`SELECT name FROM department`, (err, result) => {
          if (err) {
            console.log(err);
          } else {
            console.table(result);
          }
          init();
        });
        break;
      // View all roles
      case "view all roles":
        db.query(
          `SELECT roles.title, roles.salary, department.name FROM roles JOIN department ON roles.department_id = department.id `,
          (err, result) => {
            if (err) {
              console.log(err);
            }
            console.table(result);
            init();
          }
        );
        break;
      // View all employees
      case "view all employees":
        db.query(`SELECT * FROM employee`, (err, result) => {
          if (err) {
            console.log(err);
          }
          console.table(result);
          init();
        });
        break;
      // Add a department
      case "add a department":
        inquirer.prompt(addDepartment).then((data) => {
          db.query(
            `INSERT INTO department (name) VALUES (?)`,
            data.departmentName,
            (err, result) => {
              if (err) {
                console.log(err);
              }
              console.log(result);
              addDepartment.push(data.departmentName);
            }
          );
          init();
        });
        break;
      // Add a role
      case "add a role":
        db.query(`SELECT name FROM department`, (err, departments) => {
          if (err) {
            console.log(err);
          }
          console.log(departments);
          const addRole = [
            {
              type: "input",
              message: "What is the name of the new role?",
              name: "roleName",
            },
            {
              type: "input",
              message: "What is the salary of the role?",
              name: "salary",
            },
            {
              type: "list",
              message: "What department does the role belong in?",
              name: "departmentName",
              choices: departments,
            },
          ];
          inquirer.prompt(addRole).then((data) => {
            db.query(
              `SELECT id FROM department WHERE name = ?`,
              data.departmentName,
              (err, result) => {
                if (err) {
                  console.log(err);
                }
                let departmentId = result[0].id;
                db.query(
                  `INSERT INTO roles (title, salary, department_id) VALUES (?, ?, ?)`,
                  [data.roleName, data.salary, departmentId],
                  (err, result) => {
                    if (err) {
                      console.log(err);
                    }
                    console.log(result);
                  }
                );
                init();
              }
            );
          });
        });
        break;
      // Add an employee
      case "add an employee":
        inquirer.prompt(addEmployee).then((data) => {
          // Univeral variables
          let firstName = data.employeeFirstName;
          let lastName = data.employeeLastName;
          let employeeRoleID;

          if (data.manager === "yes") {
            let managerId = null; //When null, the employee is a manager
            db.query(`SELECT name FROM department`, (err, departments) => {
              if (err) {
                console.log(err);
              }
              const departmentPosition = [
                {
                  type: "list",
                  message: "What department will the employee be working at?",
                  name: "department",
                  choices: departments,
                },
              ];
              inquirer.prompt(departmentPosition).then((data) => {
                let department = data.department;
                console.log(department);
                db.query(
                  `SELECT id FROM department WHERE name = ?`,
                  department,
                  (err, id) => {
                    if (err) {
                      console.log(err);
                    }
                    let depId = id[0].id;
                    db.query(
                      `SELECT title FROM roles where department_id = ?;`,
                      depId,
                      (err, roleList) => {
                        if (err) {
                          console.log(err);
                        }
                        let roles = roleList.map((role) => role.title);
                        const rolePosition = [
                          {
                            type: "list",
                            message: "What role will the employee do?",
                            name: "role",
                            choices: roles,
                          },
                        ];
                        inquirer.prompt(rolePosition).then((data) => {
                          let role = data.role;
                          console.log(role);
                          db.query(
                            `SELECT id FROM roles WHERE title = ?`,
                            role,
                            (err, roleId) => {
                              console.log(roleId);
                              if (err) {
                                console.log(err);
                              }
                              employeeRoleID = roleId[0].id;
                              console.log(
                                firstName,
                                lastName,
                                employeeRoleID,

                                managerId
                              );
                              db.query(
                                `INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES (?, ?, ?, ?)`,
                                [
                                  firstName,
                                  lastName,
                                  employeeRoleID,
                                  managerId,
                                ],
                                (err) => {
                                  if (err) {
                                    console.log(err);
                                  }
                                }
                              );
                              console.log("Success!");
                              init();
                            }
                          );
                        });
                      }
                    );
                  }
                );
              });
            });
          } else {
            // If the employee is not a manager
            //Ask for what department the employee will be working at
            let managerId;

            db.query(`SELECT name FROM department`, (err, departments) => {
              if (err) {
                console.log(err);
              }
              const departmentPosition = [
                {
                  type: "list",
                  message: "What department will the employee be working at?",
                  name: "department",
                  choices: departments,
                },
              ];
              inquirer.prompt(departmentPosition).then((data) => {
                let department = data.department;
                db.query(
                  `SELECT id FROM department WHERE name = ?`,
                  department,
                  (err, id) => {
                    if (err) {
                      console.log(err);
                    }
                    let depId = id[0].id;
                    db.query(
                      `SELECT title FROM roles where department_id = ?;`,
                      depId,
                      (err, roleList) => {
                        if (err) {
                          console.log(err);
                        }
                        let roles = roleList.map((role) => role.title);
                        const rolePosition = [
                          {
                            type: "list",
                            message: "What role will the employee do?",
                            name: "role",
                            choices: roles,
                          },
                        ];
                        // Ask who the manager of the employee is
                        inquirer.prompt(manager).then((data) => {
                          let managerFirstName = data.managerFirstName;
                          let managerLastName = data.managerLastName;
                          db.query(
                            `SELECT id FROM employee WHERE first_name = ? AND last_name = ?`,
                            [managerFirstName, managerLastName],
                            (err, result) => {
                              if (err) {
                                console.log(err);
                              }
                              managerId = result[0].id;
                            }
                          );
                          inquirer.prompt(rolePosition).then((data) => {
                            let role = data.role;
                            db.query(
                              `SELECT id FROM roles WHERE title = ?`,
                              role,
                              (err, roleId) => {
                                console.log(roleId);
                                if (err) {
                                  console.log(err);
                                }
                                employeeRoleID = roleId[0].id;
                                console.log(
                                  firstName,
                                  lastName,
                                  employeeRoleID,
                                  managerId
                                );
                                db.query(
                                  `INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES (?, ?, ?, ?)`,
                                  [
                                    firstName,
                                    lastName,
                                    employeeRoleID,
                                    managerId,
                                  ],
                                  (err) => {
                                    if (err) {
                                      console.log(err);
                                    }
                                  }
                                );
                                console.log("Success!");
                                init();
                              }
                            );
                          });
                        });
                      }
                    );
                  }
                );
              });
            });
          }
        });
        break;
      // Update an employee role
      case "update an employee role":
        // Gather all employees by full name
        db.query(`SELECT * FROM employee;`, (err, employees) => {
          // Map all of the employees into an array
          let employeeList = employees.map(
            (employee) => employee.first_name + " " + employee.last_name
          );
          // Ask which employee to update
          const updateEmployee = [
            {
              type: "list",
              message: "Which employee do you want to update?",
              name: "employee",
              choices: employeeList,
            },
          ];
          inquirer.prompt(updateEmployee).then((data) => {
            // console.log(data);
            let employee = data.employee;
            // Split the employee name into first and last name
            let employeeFirstName = employee.split(" ")[0];
            let employeeLastName = employee.split(" ")[1];
            // console.log(employeeFirstName, employeeLastName);
            //Get the id of the employee
            db.query(
              `SELECT id FROM employee WHERE first_name = ? AND last_name = ?`,
              [employeeFirstName, employeeLastName],
              (err, result) => {
                let employeeId = result[0].id;
                // console.log(employeeId);
                // Get the role id of the employee
                // Give the choice to update the role or the manager status
                const updateEmployee = [
                  {
                    type: "list",
                    message: "What do you want to update?",
                    name: "update",
                    choices: ["role", "manager"],
                  }
                ];
                inquirer.prompt(updateEmployee).then((data) => {
                  //If the employee wants to change the role
                  if (data.update === "role") {
                    // Get all of the roles
                    db.query(`SELECT title FROM roles`, (err, roles) => {
                      if (err) {
                        console.log(err);
                      } else {
                        // Map all of the roles into an array
                        let roleList = roles.map((role) => role.title);
                        // Ask which role to update to
                        const updateRole = [
                          {
                            type: "list",
                            message: "What role do you want to update to?",
                            name: "role",
                            choices: roleList,
                          },
                        ];
                        inquirer.prompt(updateRole).then((data) => {
                          let role = data.role;
                          // Get the id of the role
                          db.query(
                            `SELECT id FROM roles WHERE title = ?`,
                            role,
                            (err, result) => {
                              let roleId = result[0].id;
                              //If the manager_id isn't null, gather the employee's with the manager_id = null
                              db.query(
                                `SELECT * FROM employee WHERE manager_id IS NULL`,
                                (err, employees) => {
                                  // Map all of the employees into an array
                                  let managerList = employees.map(
                                    (employee) =>
                                      employee.first_name +
                                      " " +
                                      employee.last_name
                                  );
                                  // Ask which one is your manager
                                  const updateManager = [
                                    {
                                      type: "list",
                                      message: "Who is your manager?",
                                      name: "manager",
                                      choices: managerList,
                                    },
                                  ];
                                  inquirer
                                    .prompt(updateManager)
                                    .then((data) => {
                                      let manager = data.manager;
                                      // Split the manager name into first and last name
                                      let managerFirstName =
                                        manager.split(" ")[0];
                                      let managerLastName =
                                        manager.split(" ")[1];
                                      // Get the manager id
                                      db.query(
                                        `SELECT id FROM employee WHERE first_name = ? AND last_name = ?`,
                                        [managerFirstName, managerLastName],
                                        (err, result) => {
                                          if (err) {
                                            console.log(err);
                                          }
                                          let managerId = result[0].id;
                                          // Update the employee's role and manager
                                          db.query(
                                            `UPDATE employee SET role_id = ?, manager_id = ? WHERE id = ?`,
                                            [roleId, managerId, employeeId],
                                            (err) => {
                                              if (err) {
                                                console.log(err);
                                              }
                                              console.log("Success!");
                                              init();
                                            }
                                          );
                                        }
                                      );
                                    });
                                }
                              );
                            }
                          );
                        });
                      }
                    });
                  } else {
                    // If the employee wants to change the manager status
                    // Is this employee becoming a manager?
                    const updateManager = [
                      {
                        type: "list",
                        message: "Is this employee becoming a manager?",
                        name: "manager",
                        choices: ["yes", "no"],
                      },
                    ];
                    inquirer.prompt(updateManager).then((data) => {
                      if (data === "yes") {
                        // If the employee is becoming a manager
                        // Set the manager_id to null
                        db.query(
                          `UPDATE employee SET manager_id = null WHERE id = ?`,
                          [employeeId],
                          (err) => {
                            if (err) {
                              console.log(err);
                            }
                            console.log("Success!");
                            init();
                          }
                        );
                      } else {
                        // If the employee is not becoming a manager
                        // Get all of the employees
                        db.query(
                          `SELECT * FROM employee WHERE manager_id IS NULL`,
                          (err, employees) => {
                            // Map all of the employees into an array
                            let managerList = employees.map(
                              (employee) =>
                                employee.first_name + " " + employee.last_name
                            );
                            // Ask which one is your manager
                            const updateManager = [
                              {
                                type: "list",
                                message: "Who is your manager?",
                                name: "manager",
                                choices: managerList,
                              },
                            ];
                            inquirer.prompt(updateManager).then((data) => {
                              let manager = data.manager;
                              // Split the manager name into first and last name
                              let managerFirstName = manager.split(" ")[0];
                              let managerLastName = manager.split(" ")[1];
                              // Get the manager id
                              db.query(
                                `SELECT id FROM employee WHERE first_name = ? AND last_name = ?`,
                                [managerFirstName, managerLastName],
                                (err, result) => {
                                  if (err) {
                                    console.log(err);
                                  }
                                  let managerId = result[0].id;
                                  // Update the employee's manager
                                  db.query(
                                    `UPDATE employee SET manager_id = ? WHERE id = ?`,
                                    [managerId, employeeId],
                                    (err) => {
                                      if (err) {
                                        console.log(err);
                                      }
                                      console.log("Success!");
                                      init();
                                    }
                                  );
                                }
                              );
                            });
                          }
                        );
                      }
                    });
                  }
                });
              }
            );
          });
        });
        break;
      case "exit":
        inquirer.prompt(exit).then((data) => {
          if (data.exit === "yes") {
            console.log("Goodbye");
            process.exit();
          } else {
            init();
          }
        });
        break;
    }
  });
}

init();

module.exports = init;
