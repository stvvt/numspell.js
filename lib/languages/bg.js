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
	let result = [], s;

	switch (true) {
		case number >= 1000000:
			result.push(sayIt(Math.floor(number / 1000000), GENDER_MASCULINE) + ' ' + (Math.floor(number / 1000000) == 1 ? 'милион' : 'милиона'));
			if (s = parse(number % 1000000, gender)) {
				result.push(s);
			}
			return result;
		case number >= 1000:
			if (number < 2000) {
				result.push('хиляда');
			} else {
				result.push(sayIt(Math.floor(number / 1000), GENDER_FEMININE) + ' хиляди');
			}
			if (s = parse(number % 1000, gender)) {
				result.push(s);
			}
			return result;
	}

	//assert(number < 1000);

	switch (true) {
		case number >= 1 && number <= 20:
			result.push(ones(number, gender));
			break;
		case number >= 100:
			result.push($hundreds[Math.floor(number / 100)]);
			if (s = parse(number % 100, gender)) {
				result.push(s);
			}
			break;
		case number > 20:
			result.push($tens[Math.floor(number / 10)]);
			if (s = parse(number % 10, gender)) {
				result.push(s);
			}
			break;
	}

	return result;
}

function ones(number, gender) {
	if (number > 2) {
		return $ones[number];
	}

	return $variations[gender][number];
}

function sayIt(number, gender) {
	gender = gender || GENDER_NEITHER;

	number = Math.floor(number);

	let result = parse(number, gender);

	return flatten(result);
}

sayIt.GENDER_MASCULINE = GENDER_MASCULINE;
sayIt.GENDER_FEMININE = GENDER_FEMININE;
sayIt.GENDER_NEITHER = GENDER_NEITHER;

module.exports = sayIt;