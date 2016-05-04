'use strict';

let FS = require('fs'),
	Path = require('path');

let jsReg = /\.js$/,
	rnReg = /\r\n/g, rnStr = '\r\n',
	nReg = /\n/g, nStr = '\n';

let isDir = path => {

	return FS.existsSync(path) && FS.statSync(path).isDirectory();
};

let isJSFile = path => {

	return FS.existsSync(path) && FS.statSync(path).isFile() && jsReg.test(path);
};

let wrapFile = (path, isRNLineBreak) => {

	let data = FS.readFileSync(path).toString().replace(rnReg, nStr);

	if (isRNLineBreak) {

		FS.writeFileSync(path, data.replace(nReg, rnStr));

		console.log(`换行\\r\\n字符: ${path}`);
	}
	else {

		FS.writeFileSync(path, data);

		console.log(`换行\\n字符: ${path}`);
	}
};

let wrapPath = (path, isRNLineBreak) => {

	if (isDir(path)) {

		let names = FS.readdirSync(path),
			i = 0, length = names.length;

		for (; i < length; ++i) {

			wrapPath(Path.join(path, names[i]), isRNLineBreak);
		}
	}
	else if (isJSFile(path)) {

		wrapFile(path, isRNLineBreak);
	}
};

module.exports = (path, isRNLineBreak) => {

	wrapPath(path, isRNLineBreak);
};
