#!/usr/bin/env node
var data = require("../data.js").data;
var params = process.argv;
var error = "";

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
        console.log("arg= ", arg);
        let final = []
        data.forEach(country => {
            let animalInCountry = false
            if (country.people.map(people => people.animals).flat().filter(animal => animal.name.includes(arg)).length > 0)
                animalInCountry = true
            if (animalInCountry) {
                let currentCountry = {
                    name: country.name
                }
                final.push(currentCountry)
                // console.log(final)
                country.people.forEach(people => {
                    let animalInPeople = false
                    if (people.animals.map(a => a.name).filter(a => a.includes(arg)).length > 0)
                        animalInPeople = true
                    if (animalInPeople) {
                        let currentPeople = {
                            name: people.name
                        }
                        final.push(currentPeople)
                        // console.log(final)
                        people.animals.forEach(animal => {
                            if (animal.name.includes(arg)) {
                                let currentAnimal = {
                                    name: animal.name
                                }
                                final.push(currentAnimal)
                                // console.log(final)
                            }
                        })
                    }
                })
            }
        })
        console.log(final);
    }
}

app();

module.exports = app;