#!/usr/bin/env node

params = process.argv.pop();
console.log(params);
if (params.split("=")[0] === "--filter") {
    arg = getFilterArgument(params);
    console.log(arg);
} else if (params.split("=")[0] === "--count") {
    console.log("Count option");
}

function getFilterArgument(params) {
    return params.split('=')[1];
}