const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./src/page-template.js");
const { log } = require("console");


// TODO: Write Code to gather information about the development team members, and render the HTML file.

const notEmpty = function(text) {
    return text === '' ? false : true
}

const prompt = inquirer.createPromptModule();
let team = []

const manager_questions = [
    {
        name: 'name',
        type: 'input',
        message: 'Please provide the name of the team manager: ',
        validate: notEmpty
    },
    {
        name: 'emp_id',
        type: 'input',
        message: 'Please provide the employee ID of the team manager: ',
        validate: notEmpty
    },
    {
        name: 'email',
        type: 'input',
        message: 'Please provide the email address of the team manager: ',
        validate: notEmpty
    },
    {
        name: 'office_number',
        type: 'input',
        message: 'Please provide the office number of the team manager: ',
        validate: notEmpty
    }
]

const engineer_questions = [
    {
        name: 'name',
        type: 'input',
        message: 'Please provide the name of the engineer: ',
        validate: notEmpty
    },
    {
        name: 'emp_id',
        type: 'input',
        message: 'Please provide the employee ID of the engineer: ',
        validate: notEmpty
    },
    {
        name: 'email',
        type: 'input',
        message: 'Please provide the email address of the engineer: ',
        validate: notEmpty
    },
    {
        name: 'github',
        type: 'input',
        message: 'Please provide the github username of the engineer: ',
        validate: notEmpty
    }
]

const intern_questions = [
    {
        name: 'name',
        type: 'input',
        message: 'Please provide the name of the intern: ',
        validate: notEmpty
    },
    {
        name: 'emp_id',
        type: 'input',
        message: 'Please provide the employee ID of the intern: ',
        validate: notEmpty
    },
    {
        name: 'email',
        type: 'input',
        message: 'Please provide the email address of the intern: ',
        validate: notEmpty
    },
    {
        name: 'school',
        type: 'input',
        message: 'Please provide the school name of the intern: ',
        validate: notEmpty
    }
]


const showMenu = () => {
    const menu = [
        {
            name: 'menu',
            type: 'list',
            choices: ['Add an Engineer', 'Add an Intern', 'Finish']
        }
    ]
    prompt(menu).then((answer) => {
        if(answer.menu === 'Add an Engineer') {
            prompt(engineer_questions).then((ans) => {
                team.push(new Engineer(ans.name, ans.emp_id, ans.email, ans.github));
                showMenu();
            });
        }
        if(answer.menu === 'Add an Intern') {
            prompt(intern_questions).then((ans) => {
                team.push(new Intern(ans.name, ans.emp_id, ans.email, ans.school))
                showMenu();
            });
        }
        if(answer.menu === 'Finish') {
            fs.writeFile('./output/team.html', render(team), (err) => {});
        }
    });
}

prompt(manager_questions).then((answers) => {
    team.push(new Manager(answers.name, answers.emp_id, answers.email, answers.office_number));
    showMenu();
}
)