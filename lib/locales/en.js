'use strict';

var $hyphen = ' ';
var $conjunction = ' and ';
var $separator = ' ';

var $dictionary = {
	0: 'zero',
	1: 'one',
	2: 'two',
	3: 'three',
	4: 'four',
	5: 'five',
	6: 'six',
	7: 'seven',
	8: 'eight',
	9: 'nine',
	'00': 'zero',
	'01': 'one',
	'02': 'two',
	'03': 'three',
	'04': 'four',
	'05': 'five',
	'06': 'six',
	'07': 'seven',
	'08': 'eight',
	'09': 'nine',
	'000': 'zero',
	'001': 'one',
	'002': 'two',
	'003': 'three',
	'004': 'four',
	'005': 'five',
	'006': 'six',
	'007': 'seven',
	'008': 'eight',
	'009': 'nine',
	10: 'ten',
	11: 'eleven',
	12: 'twelve',
	13: 'thirteen',
	14: 'fourteen',
	15: 'fifteen',
	16: 'sixteen',
	17: 'seventeen',
	18: 'eighteen',
	19: 'nineteen',
	20: 'twenty',
	30: 'thirty',
	40: 'fourty',
	50: 'fifty',
	60: 'sixty',
	70: 'seventy',
	80: 'eighty',
	90: 'ninety',
	100: 'hundred',
	1000: 'thousand',
	1000000: 'million',
	1000000000: 'billion',
	1000000000000: 'trillion',
	1000000000000000: 'quadrillion',
	1000000000000000000: 'quintillion'
};

function log(x, y) {
	return Math.log(x) / Math.log(y);
}

function sayIt($number) {
	var $string = null, $tens, $units, $hundreds, $remainder,
		$baseUnit, $numBaseUnits;

	switch (true) {
		case $number < 21:
			$string = $dictionary[$number];
			break;
		case $number < 100:
			$tens   = Math.floor($number / 10) * 10;
			$units  = $number % 10;
			$string = $dictionary[$tens];
			if ($units) {
				$string += $hyphen + $dictionary[$units];
			}
			break;
		case $number < 1000:
			$hundreds  = Math.floor($number / 100);
			$remainder = $number % 100;
			$string = $dictionary[$hundreds] + ' ' + $dictionary[100];
			if ($remainder) {
				$string += $conjunction + sayIt($remainder);
			}
			break;
		default:
			$baseUnit = Math.pow(1000, Math.floor(log($number, 1000)));
			$numBaseUnits = Math.floor($number / $baseUnit);
			$remainder = $number % $baseUnit;
			$string = sayIt($numBaseUnits) + $separator + $dictionary[$baseUnit];
			if ($remainder) {
				$string += $remainder < 100 ? $conjunction : $separator;
				$string += sayIt($remainder);
			}
			break;
	}

	return $string;
}

module.exports = sayIt;
module.exports.zero = 'zero';
module.exports.negative = 'minus ';