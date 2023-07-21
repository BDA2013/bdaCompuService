const inquirer = require('inquirer');

const userInput = [
    {
        type: 'list',
        message: 'What is your option?',
        name: 'options',
        choices: ['view all departments', 'view all roles', 'view all employees', 
                  'add a department', 'add a role', 'add an employee', 'update an employee role'
                ]
    }
];

function init() {
    inquirer.prompt(
        userInput
        )
        //.then ((data) => );
}

init()

module.exports = init;
