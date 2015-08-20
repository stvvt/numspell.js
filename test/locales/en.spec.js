'use strict';

var expect = require('chai').expect;
var numSpellEn = require('../../lib/locales/en.js');

describe('EN speller', function () {
	it('should convert small numbers to words', function () {
		expect(numSpellEn(1)).to.be.equal('one');
		expect(numSpellEn(2)).to.be.equal('two');
		expect(numSpellEn(10)).to.be.equal('ten');
		expect(numSpellEn(15)).to.be.equal('fifteen');
		expect(numSpellEn(25)).to.be.equal('twenty five');
	});

	it('edge', function () {
		expect(numSpellEn(1005)).to.be.equal('one thousand and five');
	});

	it('should convert numbers between 100 and 10000 to words', function () {
		expect(numSpellEn(200)).to.be.equal('two hundred');
		expect(numSpellEn(205)).to.be.equal('two hundred and five');
		expect(numSpellEn(255)).to.be.equal('two hundred and fifty five');
		expect(numSpellEn(1000)).to.be.equal('one thousand');
		expect(numSpellEn(1005)).to.be.equal('one thousand and five');
		expect(numSpellEn(1050)).to.be.equal('one thousand and fifty');
		expect(numSpellEn(1052)).to.be.equal('one thousand and fifty two');
		expect(numSpellEn(1001)).to.be.equal('one thousand and one');
		expect(numSpellEn(1020)).to.be.equal('one thousand and twenty');
		expect(numSpellEn(1102)).to.be.equal('one thousand one hundred and two');
		expect(numSpellEn(2005)).to.be.equal('two thousand and five');
		expect(numSpellEn(2055)).to.be.equal('two thousand and fifty five');
		expect(numSpellEn(10000)).to.be.equal('ten thousand');
		expect(numSpellEn(10001)).to.be.equal('ten thousand and one');
		expect(numSpellEn(10201)).to.be.equal('ten thousand two hundred and one');
	});

	it('should convert numbers between 10000 and 1000000 to words', function () {
		expect(numSpellEn(100000)).to.be.equal('one hundred thousand');
		expect(numSpellEn(100010)).to.be.equal('one hundred thousand and ten');
		expect(numSpellEn(100201)).to.be.equal('one hundred thousand two hundred and one');
		expect(numSpellEn(999999)).to.be.equal('nine hundred and ninety nine thousand nine hundred and ninety nine');
	});

	it('should convert numbers between 1000000 and 10000000 to words', function () {
		expect(numSpellEn(1000000)).to.be.equal('one million');
		expect(numSpellEn(1000100)).to.be.equal('one million one hundred');
		expect(numSpellEn(1000201)).to.be.equal('one million two hundred and one');
		expect(numSpellEn(999999999)).to.be.equal('nine hundred and ninety nine million nine hundred and ninety nine thousand nine hundred and ninety nine');
	});

	it('should convert milliards to words', function () {
		expect(numSpellEn(1000000000)).to.be.equal('one billion');
		expect(numSpellEn(1000100000)).to.be.equal('one billion one hundred thousand');
		expect(numSpellEn(1000200000)).to.be.equal('one billion two hundred thousand');
		expect(numSpellEn(1000210000)).to.be.equal('one billion two hundred and ten thousand');
		expect(numSpellEn(1000201000)).to.be.equal('one billion two hundred and one thousand');
		expect(numSpellEn(1000201842)).to.be.equal('one billion two hundred and one thousand eight hundred and fourty two');
		expect(numSpellEn(999999999999)).to.be.equal('nine hundred and ninety nine billion nine hundred and ninety nine million nine hundred and ninety nine thousand nine hundred and ninety nine');
	});
});