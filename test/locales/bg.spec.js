'use strict';

var expect = require('chai').expect;
var numSpellBg = require('../../lib/locales/bg.js');

describe('BG speller', function () {
	it('should convert small numbers to words', function () {
		expect(numSpellBg(1)).to.be.equal('едно');
		expect(numSpellBg(2)).to.be.equal('две');
		expect(numSpellBg(10)).to.be.equal('десет');
		expect(numSpellBg(15)).to.be.equal('петнадесет');
		expect(numSpellBg(25)).to.be.equal('двадесет и пет');
	});

	it('should respect gender of digits in BG', function () {
		expect(numSpellBg(1, numSpellBg.GENDER_MASCULINE)).to.be.equal('един');
		expect(numSpellBg(1, numSpellBg.GENDER_FEMININE)).to.be.equal('една');
		expect(numSpellBg(1, numSpellBg.GENDER_NEITHER)).to.be.equal('едно');

		expect(numSpellBg(2, numSpellBg.GENDER_MASCULINE)).to.be.equal('два');
		expect(numSpellBg(2, numSpellBg.GENDER_FEMININE)).to.be.equal('две');
		expect(numSpellBg(2, numSpellBg.GENDER_NEITHER)).to.be.equal('две');
	});

	it('should convert numbers between 100 and 10000 to words', function () {
		expect(numSpellBg(200)).to.be.equal('двеста');
		expect(numSpellBg(205)).to.be.equal('двеста и пет');
		expect(numSpellBg(255)).to.be.equal('двеста петдесет и пет');
		expect(numSpellBg(1000)).to.be.equal('хиляда');
		expect(numSpellBg(1005)).to.be.equal('хиляда и пет');
		expect(numSpellBg(1050)).to.be.equal('хиляда и петдесет');
		expect(numSpellBg(1052)).to.be.equal('хиляда петдесет и две');
		expect(numSpellBg(1001)).to.be.equal('хиляда и едно');
		expect(numSpellBg(1020)).to.be.equal('хиляда и двадесет');
		expect(numSpellBg(1102)).to.be.equal('хиляда сто и две');
		expect(numSpellBg(2005)).to.be.equal('две хиляди и пет');
		expect(numSpellBg(2055)).to.be.equal('две хиляди петдесет и пет');
		expect(numSpellBg(10000)).to.be.equal('десет хиляди');
		expect(numSpellBg(10001)).to.be.equal('десет хиляди и едно');
		expect(numSpellBg(10201)).to.be.equal('десет хиляди двеста и едно');
	});

	it('should convert numbers between 10000 and 1000000 to words', function () {
		expect(numSpellBg(100000)).to.be.equal('сто хиляди');
		expect(numSpellBg(100010)).to.be.equal('сто хиляди и десет');
		expect(numSpellBg(100201)).to.be.equal('сто хиляди двеста и едно');
		expect(numSpellBg(999999)).to.be.equal('деветстотин деветдесет и девет хиляди деветстотин деветдесет и девет');
	});

	it('should convert numbers between 1000000 and 10000000 to words', function () {
		expect(numSpellBg(1000000)).to.be.equal('един милион');
		expect(numSpellBg(1000100)).to.be.equal('един милион и сто');
		expect(numSpellBg(1000201)).to.be.equal('един милион двеста и едно');
		expect(numSpellBg(999999999)).to.be.equal('деветстотин деветдесет и девет милиона деветстотин деветдесет и девет хиляди деветстотин деветдесет и девет');
	});

	it('should convert milliards to words', function () {
		expect(numSpellBg(1000000000)).to.be.equal('един милиард');
		expect(numSpellBg(1000100000)).to.be.equal('един милиард и сто хиляди');
		expect(numSpellBg(1000200000)).to.be.equal('един милиард и двеста хиляди');
		expect(numSpellBg(1000210000)).to.be.equal('един милиард и двеста и десет хиляди');
		expect(numSpellBg(1000201000)).to.be.equal('един милиард и двеста и една хиляди');
		expect(numSpellBg(1000201842)).to.be.equal('един милиард двеста и една хиляди осемстотин четиридесет и две');
		expect(numSpellBg(999999999999)).to.be.equal('деветстотин деветдесет и девет милиарда деветстотин деветдесет и девет милиона деветстотин деветдесет и девет хиляди деветстотин деветдесет и девет');
	});
});