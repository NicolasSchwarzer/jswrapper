#!/usr/bin/env node

'use strict';

let Command = require('../src/command'),
	Wrapper = require('../src/wrapper');

let command = new Command(process.argv),
	path = process.cwd(),
	isRNLineBreak, lineBreakWord;

if (!command.isValid) {

	return;
}

isRNLineBreak = command.arg === '-r' ? true : false;

lineBreakWord = isRNLineBreak ? '\\r\\n' : '\\n';

process.stdin.setEncoding('utf8');

process.stdout.write(`确定要将${path}目录下所有javascript文件的换行符全部转换成${lineBreakWord}: (y/n) `);

process.stdin.on('readable', () => {

	let chunk = process.stdin.read();

	if (chunk !== null) {

		if (chunk.toString().trim().toLowerCase() === 'y') {

			Wrapper(path, isRNLineBreak);

			console.log(`换行符${lineBreakWord}转换完成`);
		}
		else {

			console.log(`换行符${lineBreakWord}转换终止`);
		}

		process.exit();
	}
});
