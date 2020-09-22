#!/usr/bin/env node
const { program } = require("commander");
const inquirer = require("inquirer");
const fs = require("fs");
const path = require("path");
const chalk = require("chalk");

const python = require("../lib/python");
const javascript = require("../lib/javascript");

const langMap = {
    javascript: javascript,
    python: python,
};

const exist = (dir) => {
    try {
        fs.accessSync(
            dir,
            fs.constants.F_OK | fs.constants.R_OK | fs.constants.W_OK
        );
        return true;
    } catch (e) {
        return false;
    }
};

const mkdirp = (dir) => {
    const dirname = path
        .relative(".", path.normalize(dir))
        .split(path.sep)
        .filter((p) => !!p);
    dirname.forEach((d, idx) => {
        const pathBuilder = dirname.slice(0, idx + 1).join(path.sep);
        if (!exist(pathBuilder)) {
            fs.mkdirSync(pathBuilder);
        }
    });
};

const makeTemplate = ({ directory, title, username, language, testCase }) => {
    const psDirectory = path.join(directory, title);
    mkdirp(psDirectory);

    const program = langMap[`${language}`];
    const solutionFile = path.join(
        psDirectory,
        `${username}.${program.fileExt}`
    );
    const testFile = program.testExt
        ? path.join(psDirectory, `${username}.${program.testExt}`)
        : null;

    writeSync(solutionFile, program.solution);
    if (testFile) {
        writeSync(testFile, program.test(title, username, testCase));
    } else {
        console.error(
            chalk.bold.red(
                `❌ Testing for "${language}" is currently not supported.`
            )
        );
    }
};

const writeSync = (file, str) => {
    if (exist(file)) {
        console.error(chalk.bold.red(`❌ ${file} already exists.`));
    } else {
        fs.writeFileSync(file, str);
        console.log(chalk.bold.green(`✅ ${file} successfully created.`));
    }
};

program.version("1.0.0", "-v, --version", "output the current version");

const questions = [
    {
        type: "input",
        name: "directory",
        message:
            'Please enter the path where the "problem-solving directory" will be located. ex) problems/programmers',
        default: ".",
    },
    {
        type: "input",
        name: "title",
        message:
            "Please enter the title for the problem. ex) 42576-an-uncompleted-player",
        default: "problem",
    },
    {
        type: "input",
        name: "username",
        message: "Please enter a username",
        validate: function (value) {
            if (value) {
                return true;
            }
            return "Please enter a username";
        },
    },
    {
        type: "list",
        name: "language",
        message: "Please select a language.",
        choices: ["javascript", "python"],
    },
    {
        type: "input",
        name: "testCase",
        message: "How many test cases do you need?",
        default: 1,
    },
];

inquirer.prompt(questions).then((answer) => {
    makeTemplate(answer);
});
