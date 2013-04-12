var _ 	 = require('underscore'),
	test = require('tap').test,
	main = require('./../lib/main');

test('ValidationError', function(t) {

	// helpers
	t.ok(_.isFunction(main.helpers.checkGotAllParams), 'checkGotAllParams fn is exposed');

	// middleware
	t.ok(_.isFunction(main.middleware.sanitizeRequest), 'sanitizeRequest fn is exposed');
	t.ok(_.isFunction(main.middleware.allowJustXHR), 'allowJustXHR fn is exposed');
	t.ok(_.isFunction(main.middleware.allowJustJsonRequests), 'allowJustJsonRequests fn is exposed');
	t.ok(_.isFunction(main.middleware.allowXOrigin), 'allowXOrigin fn is exposed');

	t.end();
});