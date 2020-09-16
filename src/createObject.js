#!/usr/bin/env node

function createObject(data, input, test) {
    var filter = ""
    var count = ""
    if (input.length < 3 || input.length > 4) {
        console.log("You should have only one or two options")
        console.log("Options: --filter=[PARAMETER] and --count")
        return { data: undefined, count: undefined }
    }
    filter = input.filter(x => x.includes("--filter"))
    count = input.filter(x => x.includes("--count"))
    filter = filter.pop()
    count = count.pop()
    if (typeof filter === "undefined" || typeof count === "undefined" && process.argv.length === 4) {
        console.log("Usage: node src/index.js [ARG] or node . [ARG] ")
        console.log("ARG: --filter=[PARAMETER] and --count")
        return { data: undefined, count: undefined }
    } else {
        if (filter === "--filter" || filter.split("=")[1] === "") {
            console.log("Filter usage: --filter=[PARAMETER]")
            console.log("And this need to have one parameter")
            return { data: undefined, count: undefined }
        }
        arg = filter.split("=")[1]
        var final = []
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
        if (count && test === true) {
            final.forEach((element, index) => {
                element.name = element.name.concat(` [${index + 1}]`)
                element.people.forEach((element, index) => {
                    element.name = element.name.concat(` [${index + 1}]`)
                })
            })
        }
    }
    return { data: final, count: count }
}

function printObject(final, count) {
    if (typeof count !== 'undefined') {
        final.forEach((element, index) => {
            element.name = element.name.concat(` [${index + 1}]`)
            element.people.forEach((element, index) => {
                element.name = element.name.concat(` [${index + 1}]`)
            })
        })
        final.forEach(x => console.log(JSON.stringify(x, null, 2)))
    } else {
        final.forEach(x => console.log(JSON.stringify(x, null, 2)))
    }
}

module.exports = { printObject, createObject }