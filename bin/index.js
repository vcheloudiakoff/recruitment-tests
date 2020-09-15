#!/usr/bin/env node

var data = require("../data.js").data
var func = require('./createObject.js')

var obj = func.createObject(data, process.argv)

if (obj.data !== undefined || obj.count !== undefined) {
    func.printObject(obj.data, obj.count)
}
