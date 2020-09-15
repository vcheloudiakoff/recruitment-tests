#!/usr/bin/env node
var data = require("../data.js").data
var params = process.argv
var filter = ""
var count = ""
var error = ""

function getFilterArgument(params) {
    return params.split('=')[1]
}

function app() {
    if (process.argv.length < 3 || process.argv.length > 4) {
        console.log("You should have only one or two options")
        console.log("Options: --filter=[PARAMETER] or/and --count")
        error = "Options error"
        return error
    }
    filter = params.filter(x => x.includes("--filter"))
    count = params.filter(x => x.includes("--count"))
    filter = filter.pop()
    count = count.pop()
    console.log(filter)
    console.log(count)
    if (typeof filter === "undefined") {
        console.log("Usage: node bin/index.js [ARG] ")
        console.log("ARG: --filter=[PARAMETER] or --count")
        error = "Usage"
        return error
    }
    if (typeof count === "undefined" && process.argv.length === 4) {
        console.log("Usage: node bin/index.js [ARG] ")
        console.log("ARG: --filter=[PARAMETER] or --count")
        error = "Usage"
        return error
    } else {
        if (filter === "--filter" || filter.split("=")[1] === "") {
            console.log("Filter usage: --filter=[PARAMETER]")
            console.log("And this need to have one parameter")
            error = "Filter usage"
            return error
        }
        arg = filter.split("=")[1]
        let final = []
        data.forEach(country => {
            let animalInCountry = false
            if (country.people.map(people => people.animals).flat().filter(animal => animal.name.includes(arg)).length > 0)
                animalInCountry = true
            if (animalInCountry) {
                let currentCountry = {
                    name: country.name,
                    people: []
                }
                final.push(currentCountry)
                country.people.forEach(people => {
                    let animalInPeople = false
                    if (people.animals.map(a => a.name).filter(a => a.includes(arg)).length > 0)
                        animalInPeople = true
                    if (animalInPeople) {
                        let currentPeople = {
                            name: people.name,
                            animals: []
                        }
                        currentCountry.people.push(currentPeople)
                        people.animals.forEach(animal => {
                            if (animal.name.includes(arg)) {
                                let currentAnimal = {
                                    name: animal.name
                                }
                                currentPeople.animals.push(currentAnimal)
                            }
                        })
                    }
                })
            }
        })
        if (typeof count !== 'undefined') {
            console.log('Count option OK')
            final.forEach(x => console.log(JSON.stringify(x, null, 2)))
        } else {
            final.forEach(x => console.log(JSON.stringify(x, null, 2)))
        }
    }
}

app()

module.exports = app