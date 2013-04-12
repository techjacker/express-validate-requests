var _             = require('underscore'),
    test          = require('tap').test,
    justJson      = require('./../../lib/middleware/allow-just-json-requests.js'),
    NotAcceptable = require('custom-errors').request.NotAcceptable; // my custom error classes


// test helpers
var req = {
	type: 'text'
};
var res = {
	format: function (mimeTypes) {
		mimeTypes[req.type]();
	}
};

test('Just JSON tests', function(t) {

	t.plan(4);

	t.ok(_.isFunction(justJson), 'justJson is a fn');

	var count = 0;
	// test spy
	var next = function (err) {
		if (++count <= 2) {
			t.ok(err instanceof NotAcceptable, 'not acceptable error passed as next arg')
		} else {
			t.notOk(err, 'error should be undefined for json requests')
		}
	};
	// shd generate error
	req.type = 'text';
	justJson(req, res, next);

	// shd generate error
	req.type = 'html';
	justJson(req, res, next);

	// shd NOT generate error
	req.type = 'json';
	justJson(req, res, next);
});