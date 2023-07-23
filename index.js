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
        .then ((data) => {
            //console.log(data.options);
            switch (data.options) {
                case 'view all departments':
                    //console.log(data.options);
                    break;
                case 'view all roles':
                    //console.log(data.options);
                    break;
                case 'view all employees':
                    //console.log(data.options);
                    break;
                case 'add a department':
                    //console.log(data.options);
                    break;
                case 'add a role':
                    //console.log(data.options);
                    break;
                case 'add an employee':
                    //console.log(data.options);
                    break;
                case 'update an employee role':
                    //console.log(data.options);
                    break;
            }
        });
}

init()

module.exports = init;
