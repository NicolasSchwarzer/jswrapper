'use strict';

let FS = require('fs'),
	Path = require('path');

let argReg = /^-[rn]$/,
	versionReg = /^(?:-V)|(?:--version)$/;

let logHelpInfo = () => {

	console.log([
		'\n',
		'  Usage: javascript文件换行符转换工具\n',
		'\n',
		'  Options:\n',
		'\n',
		'    -h, --help      output usage information\n',
		'    -V, --version   output the version number\n',
		'    -r              换行符全部转换成\\r\\n\n',
		'    -n              换行符全部转换成\\n\n'
	].join(''));
};

let logVersionInfo = () => {

	console.log(JSON.parse(FS.readFileSync(Path.join(__dirname, '..', 'package.json'))).version);
};

module.exports = class {

	constructor(args) {

		this.$args = args;
	}

	get isValid() {

		let args = this.$args;

		if (args.length < 3) {

			logHelpInfo();

			return false;
		}
		else {

			let arg = args[2];

			if (versionReg.test(arg)) {

				logVersionInfo();

				return false;
			}
			else if (argReg.test(arg)) {

				return true;
			}
			else {

				logHelpInfo();

				return false;
			}
		}
	}

	get arg() {

		return this.$args[2] || '';
	}
}
