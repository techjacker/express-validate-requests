var _             = require('underscore'),
    test          = require('tap').test,
    justXHR       = require('./../../lib/middleware/allow-just-xhr.js'),
    NotAcceptable = require('custom-errors').request.NotAcceptable; // my custom error classes


// test helpers
var req = {
	xhr: false
};

test('Just XHR tests', function(t) {

	t.plan(2);

	var count = 0;
	// test spy
	var next = function (err) {
		if (count++ < 1) {
			t.ok(err instanceof NotAcceptable, 'not acceptable error passed as next arg')
		} else {
			t.notOk(err, 'error should be undefined for json requests')
		}
	};
	// shd generate error
	req.xhr = false;
	justXHR(req, null, next);

	// shd NOT generate error
	req.xhr = true;
	justXHR(req, null, next);
});