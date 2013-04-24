// var _        = require('underscore'),
var test     = require('tap').test,
	_     	 = require('underscore'),
    xOrigin  = require('./../../lib/middleware/allow-cross-origin-requests.js'),
    Forbidden = require('custom-errors').request.Forbidden;



var jsonReq = true,
	allowedHosts = ["api.domainx.com", "www.domainx.com"],
	allowedOrigins = ["http://domainx.com", "http://www.domainx.com"],
	req = {
		is: function () {
			return jsonReq;
		},
		headers: {
			origin: "http://www.domainx.com",
			referer: "www.domainx.com"
		},
		query: {
			magicWord: true
		}
	},
	opts = {
		originSecret: "magicWord",
		dontCheckReferer: true
	};

test('X Origin - Check Host', function(t) {

	t.notOk(xOrigin.checkHost('not.domainx.com', allowedHosts), 'host not in allowed list');
	t.notOk(xOrigin.checkHost('www.different.com', allowedHosts), 'host not in allowed list');
	t.ok(xOrigin.checkHost('www.domainx.com', allowedHosts), 'host is allowed');
	t.end();
});

test('X Origin - validateHostsOrigins - jsonP requests', function(t) {

    var val = xOrigin.validateHostsOrigins;
	req.headers.origin = 'http://www.hack.io';

	// shd pass because jsonP
	jsonReq = false;
	t.ok(val(req, allowedHosts, allowedOrigins), 'jsonp request without origin allowed');
	jsonReq = true;
	req.headers.origin = "http://www.domainx.com";
	t.end();
});



test('X Origin - validateHostsOrigins', function(t) {

    var val = xOrigin.validateHostsOrigins;

	// shd pass
	t.ok(val(req, allowedHosts, allowedOrigins), 'host and origin are both allowed');

	// shd fail because origin invalid
	req.headers.referer = 'www.domainx.co.uk';
	t.notOk(val(req, allowedHosts, allowedOrigins), 'host not in allowed list');

	// shd pass
	t.ok(val(req, allowedHosts, allowedOrigins, opts), 'host not in allowed list BUT checkReferer option set to false');

	// shd fail
	req.headers.referer = 'www.domainx.com';
	req.headers.origin = 'http://www.hack.io';
	t.notOk(val(req, allowedHosts, allowedOrigins), 'origin not in allowed list');

	// shd pass
	t.ok(val(req, allowedHosts, allowedOrigins, opts), 'origin not in allowed list BUT secret req param matches');

	t.end();
});



test('X Origin - allowOrigin', function(t) {

	t.plan(11);

	// spy
	var counter = 0,
		headers = {},
		res 	= {
			header: function (header, val) {
				headers[header] = val;
			}
		},
		next 	= function (err) {
			if (counter++ < 1) {
				t.notOk(err, 'no error shd be returned by passing test');
				t.equal(_.keys(headers).length, 4, '4 headers shd have been written by passing test');
				t.equal(headers['Access-Control-Allow-Origin'], req.headers.origin, 'Access-Control-Allow-Origin header set correctly');
				t.equal(headers['Access-Control-Allow-Credentials'], true, 'Access-Control-Allow-Credentials header set correctly');
				t.equal(headers['Access-Control-Allow-Methods'], 'GET,PUT,POST,DELETE', 'Access-Control-Allow-Methods header set correctly');
				t.equal(headers['Access-Control-Allow-Headers'], 'Content-Type, X-Requested-With', 'Access-Control-Allow-Headers header set correctly');
			} else {
				t.equal(_.keys(headers).length, 4, '0 headers shd have been written by failing test');
				t.ok(err, 'error shd be returned by failing test');
				t.ok(err instanceof Forbidden, 'error returned by failing test shd be instanceof Forbidden custom error class');
			}
		},
		passTests = xOrigin.allowXOrigin(allowedHosts, allowedOrigins, opts),
		failTests = xOrigin.allowXOrigin(allowedHosts, allowedOrigins);


	// test wrapper fn returns new fn that can be plugged into app.use()
	t.ok(_.isFunction(passTests), 'allowOrigin fn returns another function');
	t.ok(_.isFunction(failTests), 'allowOrigin fn returns another function');

	passTests(req, res, next);
	req.headers.referer = 'www.domainx.co.uk';
	failTests(req, res, next);

	t.end();
});