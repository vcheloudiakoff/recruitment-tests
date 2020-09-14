#!/usr/bin/env node
var data = require("../data.js");
var params = process.argv;
var error = "";

var stringify = JSON.stringify(data);
console.log(stringify);
var parsedData = JSON.parse(stringify);
// TESTING console.log
// for (i = 0; i < parsedData.data.length;i++) {
//     for (j = 0; j < parsedData.data[i].people.length;j++) {
//         for (k = 0; k < parsedData.data[i].people[j].animals.length;k++) {
//             console.log(parsedData.data[i].people[j].animals[k]);
//         }
//     }
// }

function getCountries(parsedData) {
    let countries = [];
    for (i = 0;i < parsedData.data.length;i++) {
        // console.log(parsedData.data[i].name);
        countries.push(parsedData.data[i].name);
    }
    return countries;
}

function getPeople(parsedData) {
    let people = [];
    for (i = 0; i < parsedData.data.length;i++) {
        for (j = 0; j < parsedData.data[i].people.length;j++) {
            // console.log(parsedData.data[i].people[j]);
            people.push(parsedData.data[i].people[j]);
        }
    }
    return people;
}

function getAnimals(parsedData) {
    let animals = [];
    for (i = 0; i < parsedData.data.length;i++) {
        for (j = 0; j < parsedData.data[i].people.length;j++) {
            for (k = 0; k < parsedData.data[i].people[j].animals.length;k++) {
                // console.log(parsedData.data[i].people[j].animals[k]);
                animals.push(parsedData.data[i].people[j].animals[k]);
            }
        }
    }
    return animals;
}

function getFilterArgument(params) {
    return params.split('=')[1];
}

function app() {
    if (process.argv.length != 3) {
        console.log("You should have only one option");
        console.log("Options: --filter=[PARAMETER] or --count");
        error = "Options error";
        return error;
    }
    params = params.pop();
    if ((params.split("=")[0] !== "--filter" && params !== "--count")) {
        console.log("Usage: node bin/index.js [ARG] ");
        console.log("ARG: --filter=[PARAMETER] or --count");
        error = "Usage";
        return error;
    } else {
        if (params === "--filter" || getFilterArgument(params) === "") {
            console.log("Filter usage: --filter=[PARAMETER]");
            console.log("And this need to have one parameter");
            error = "Filter usage";
            return error;
        }
        if (params === "--count") {
            console.log('Count option OK');
            return
        }
        arg = getFilterArgument(params);
        let animals = getAnimals(parsedData);
        console.log(animals.filter(x => x.name.includes(arg)));
        console.log("arg= ", arg);
    }
}

app();

module.exports = app;