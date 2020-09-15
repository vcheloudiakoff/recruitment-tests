#!/usr/bin/env node

const func = require('./createObject.js')

function test1() {
	let data = [{
		name: 'Toto',
		people:
			[{
				name: 'Toto',
				animals:
					[{ name: 'A' },
					{ name: 'B' }]
			}]
	}]
	if (JSON.stringify(func.createObject(data, ["node", "index.js", "--filter=A"], true).data) == JSON.stringify([{
		name: 'Toto',
		people:
			[{
				name: 'Toto',
				animals:
					[{ name: 'A' }]
			}]
	}])) {
		console.log('\x1b[33m', "Test with one country, one person and many animals:\n \tnode index.js --filter=A \t  =>", "\x1b[32m", "OK\n");
	} else {
		console.log('\x1b[33m', "Test with one country, one person and many animals:\n \tnode index.js --filter=A \t  =>", "\x1b[31m", "KO\n");
	}
}

function test2() {
	let data = [{
		name: 'Toto',
		people:
			[{
				name: 'Toto',
				animals:
					[{ name: 'A' },
					{ name: 'B' }]
			}]
	}]
	if (JSON.stringify(func.createObject(data, ["node", "index.js", "--filter=A", "--count"], true).data) == JSON.stringify([{
		name: 'Toto [1]',
		people:
			[{
				name: 'Toto [1]',
				animals:
					[{ name: 'A' }]
			}]
	}])) {
		console.log('\x1b[33m', "Test with one country, one person and many animals:\n \tnode index.js --filter=A --count  =>", "\x1b[32m", "OK\n");
	} else {
		console.log('\x1b[33m', "Test with one country, one person and many animals:\n \tnode index.js --filter=A --count  =>", "\x1b[31m", "KO\n");
	}
}

function test3() {
	let data = [{
		name: 'Toto',
		people:
			[{
				name: 'Toto',
				animals:
					[{ name: 'A' },
					{ name: 'B' }]
			}],
	}, {
		name: 'Tata',
		people:
			[{
				name: 'Tata',
				animals:
					[{ name: 'A' },
					{ name: 'B' }]
			}]
	}]
	if (JSON.stringify(func.createObject(data, ["node", "index.js", "--filter=B", "--count"], true).data) == JSON.stringify([{
		name: 'Toto [1]',
		people:
			[{
				name: 'Toto [1]',
				animals:
					[{ name: 'B' }]
			}],
	}, {
		name: 'Tata [2]',
		people:
			[{
				name: 'Tata [1]',
				animals:
					[{ name: 'B' }]
			}]
	}])) {
		console.log('\x1b[33m', "Test with two coutries, one person per country and many animals:\n\tnode index.js --filter=B --count  =>", "\x1b[32m", "OK\n");
	} else {
		console.log('\x1b[33m', "Test with two coutries, one person per country and many animals:\n\tnode index.js --filter=B --count  =>", "\x1b[31m", "KO\n");
	}
}

function test4() {
	let data = [{
		name: 'Toto',
		people:
			[{
				name: 'Toto',
				animals:
					[{ name: 'A' },
					{ name: 'B' }]
			}],
	}, {
		name: 'Tata',
		people:
			[{
				name: 'Tata',
				animals:
					[{ name: 'A' },
					{ name: 'B' }]
			}, {
				name: 'Titi',
				animals:
					[{ name: 'A' },
					{ name: 'B' }]
			}]
	}]
	if (JSON.stringify(func.createObject(data, ["node", "index.js", "--filter=B", "--count"], true).data) == JSON.stringify([{
		name: 'Toto [1]',
		people:
			[{
				name: 'Toto [1]',
				animals:
					[{ name: 'B' }]
			}],
	}, {
		name: 'Tata [2]',
		people:
			[{
				name: 'Tata [1]',
				animals:
					[{ name: 'B' }]
			}, {
				name: 'Titi [2]',
				animals:
					[{ name: 'B' }]
			}]
	}])) {
		console.log('\x1b[33m', "Test with two coutries, two persons and many animals:\n\tnode index.js --filter=B --count  =>", "\x1b[32m", "OK\n");
	} else {
		console.log('\x1b[33m', "Test with two coutries, two persons and many animals:\n\tnode index.js --filter=B --count  =>", "\x1b[31m", "KO\n");
	}
}

test1()
test2()
test3()
test4()