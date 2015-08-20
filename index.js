'use strict';

module.exports = function (language) {
	return function wrap(number) {
		var args = Array.prototype.slice.call(arguments),
			sayIt = module.exports[language];

		if (Number(number) !== number || number % 1 !== 0) {
			throw new Error('Expecting integer argument');
		}

		if (number === 0) {
			return sayIt.zero;
		} else if (number < 0) {
			args[0] = -number;
			return sayIt.negative + wrap.apply(this, args);
		}

		return sayIt.apply(this, args);
	}
}

module.exports.locales = ['bg', 'en'];
for (var i = 0; i < module.exports.locales.length; i++) {
	module.exports[module.exports.locales[i]] = require('./lib/locales/' + module.exports.locales[i] + '.js');
}

