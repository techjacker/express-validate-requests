// var _        = require('underscore'),
var test     = require('tap').test,
    checkGot = require('./../../lib/helpers/check-got-all-params.js');


test('Check Got All Params', function(t) {
	var okOne = {
			"one" 	: 0,
			"two" 	: '',
			"three" : 'hohoho'
		},
		requiredParams = ["one", "two", "three", "four"];

	// shd fail
	t.notOk(checkGot(okOne, requiredParams), 'object does NOT have all required params');
	okOne.four = null;
	t.notOk(checkGot(okOne, requiredParams), 'object does have all required params but one is null');
	okOne.four = 44;

	// shd succeed
	t.ok(checkGot(okOne, requiredParams), 'object has all required params and none and null or undefined');
	t.end();
});