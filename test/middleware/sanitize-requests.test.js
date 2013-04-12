// var _        = require('underscore'),
var test     = require('tap').test,
    sanitize = require('./../../lib/middleware/sanitize-requests.js');


// test helpers
var req = {
		query: {
			"one" : '&amp;',
			"two" : '<a href="javascript:alert(\'xss\')">some text</a>'
		}
	},
	reqExpect = {
		query: {
			"one" : '&',
			"two" : '<a >some text</a>'
		}
	};

test('Just XHR tests', function(t) {

	t.plan(1);

	var next = function (err) {
		t.deepEqual(req, reqExpect, 'request params should be decoded and xss sanitized')
	};
	sanitize(req, null, next);
});