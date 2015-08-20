'use strict';

const GENDER_MASCULINE = 1;
const GENDER_FEMININE = 2;
const GENDER_NEITHER = 3;

const $hundreds = [
	undefined, 'сто', 'двеста', 'триста', 'четиристотин', 'петстотин', 'шестстотин', 'седемстотин',
	'осемстотин', 'деветстотин'
];
const $tens = [
	undefined, 'десет', 'двадесет', 'тридесет', 'четиридесет', 'петдесет', 'шестдесет', 'седемдесет',
	'осемдесет', 'деветдесет'
];
const $ones = [
	undefined, 'едно', 'две', 'три', 'четири', 'пет', 'шест', 'седем', 'осем', 'девет', 'десет',
	'единадесет', 'дванадесет', 'тринадесет', 'четиринадесет', 'петнадесет', 'шестнадесет',
	'седемнадесет', 'осемнадесет', 'деветнадесет', 'двадесет'
];

let $variations = {};

$variations[GENDER_MASCULINE] = {
	1: 'един', 2: 'два'
};
$variations[GENDER_FEMININE] = {
	1: 'една', 2: 'две'
};
$variations[GENDER_NEITHER] = {
	1: 'едно', 2: 'две'
};

/**
 *
 * @access private
 * @param r
 * @returns {string}
 */
function flatten(r) {

	if (r.length === 0) {
		return '';
	}

	if (r.length === 1) {
		return r[0];
	}

	if (r[1].length === 1) {
		return r[0] + ' и ' + flatten(r[1]);
	}

	return r[0] + ' ' + flatten(r[1]);
}

/**
 *
 * @param number
 * @param gender
 * @returns {Array}
 */
function parse(number, gender) {
	let result = [];

	switch (true) {
		case number >= 1000000000:
			result.push(sayIt(Math.floor(number / 1000000000), GENDER_MASCULINE) + ' ' + (Math.floor(number / 1000000000) == 1 ? 'милиард' : 'милиарда'));
			result.push(parse(number % 1000000000, gender));
			break;
		case number >= 1000000:
			result.push(sayIt(Math.floor(number / 1000000), GENDER_MASCULINE) + ' ' + (Math.floor(number / 1000000) == 1 ? 'милион' : 'милиона'));
			result.push(parse(number % 1000000, gender));
			break;
		case number >= 1000:
			if (number < 2000) {
				result.push('хиляда');
			} else {
				result.push(sayIt(Math.floor(number / 1000), GENDER_FEMININE) + ' хиляди');
			}
			result.push(parse(number % 1000, gender));
			break;
		case number >= 1 && number <= 20:
			result.push(ones(number, gender));
			break;
		case number >= 100:
			result.push($hundreds[Math.floor(number / 100)]);
			result.push(parse(number % 100, gender));
			break;
		case number > 20:
			result.push($tens[Math.floor(number / 10)]);
			result.push(parse(number % 10, gender));
			break;
	}

	result = result.filter(function (n) {
		return n.length > 0;
	});

	return result;
}

function ones(number, gender) {
	if (number > 2) {
		return $ones[number];
	}

	return $variations[gender][number];
}

/**
 * Convert the whole part of a number to words in Bulgarian language
 *
 * @param {Number} number
 * @param {Number} [gender = GENDER_NEITHER]
 * @returns {string}
 */
function sayIt(number, gender) {
	var inWords;

	switch (true) {
		case number === 0:
			inWords = 'нула';
			break;
		case number < 0:
			inWords = 'минус ' + sayIt(-number, gender);
			break;
		default:
			inWords = flatten(parse(Math.floor(number), gender || GENDER_NEITHER));
	}

	return inWords;
}

module.exports = sayIt;
module.exports.GENDER_MASCULINE = GENDER_MASCULINE;
module.exports.GENDER_FEMININE = GENDER_FEMININE;
module.exports.GENDER_NEITHER = GENDER_NEITHER;
module.exports.zero = 'нула';
module.exports.negative = 'минус ';
