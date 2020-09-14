#!/usr/bin/env node

params = process.argv.pop();
console.log("params = ", params);
console.log("params splitted = ", params.split("=")[0]);
if (process.argv.length >= 3) {
    console.log("You should have only one option");
    console.log("Options: --filter=[PARAMETER] or --count");
    return
}
if (params.split("=")[0] !== "--filter" && params !== "--count") {
    console.log("Usage: node bin/index.js [ARG] ");
    console.log("ARG: --filter=[PARAMETER] or --count");
    return
} else {
    if (params === "--filter" || getFilterArgument(params) === "") {
        console.log("Filter usage: --filter=[PARAMETER]");
        console.log("And this need to have one parameter");
        return
    }
    if (params === "--count") {
        console.log('Count option OK');
        return
    }
    arg = getFilterArgument(params);
    console.log("arg= ", arg);
}

function getFilterArgument(params) {
    return params.split('=')[1];
}