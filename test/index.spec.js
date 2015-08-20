'use strict';

var expect = require('chai').expect;
var sayIt = require('../index.js');

describe('sayIt in any language', function () {
	it('should return locale zero', function () {
		sayIt.locales.forEach(function (locale) {
			var sayItLocale = sayIt(locale);
			expect(sayItLocale(0)).to.be.equal(sayIt[locale].zero);
		});
	});

	it('should play nice with negatives', function () {
		var rand = Math.floor(Math.random() * (1000000000 - 1)) + 1;

		sayIt.locales.forEach(function (locale) {
			var sayItLocale = sayIt(locale);
			expect(sayItLocale(-rand)).to.be.equal(sayIt[locale].negative + sayItLocale(rand));
		});
	});

	it('should be explicit when given wrong params', function () {
		expect(sayIt('whatever-locale').bind(null, '123')).to.throw(Error);
		expect(sayIt('whatever-locale').bind(null, undefined)).to.throw(Error);
	});
});
