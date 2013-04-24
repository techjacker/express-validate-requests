/*jslint nomen: true, plusplus: false, sloppy: true, white:true*/
/*jshint nomen: false, curly: true, plusplus: false, expr:true, undef:true, newcap:true, latedef:true, camelcase:true  */
/*global module: false, iScroll:false, setTimeout: false, document:false, WebKitCSSMatrix:false, _: false, Backbone: false, backbone: false, $: false, define: false, require: false, console: false, window:false */

var _ = require('underscore');
var	Forbidden = require('custom-errors').request.Forbidden;

var checkHost = function (actual, allowed) {

	var allowed = _.any(allowed, function (domain) {
		var re = new RegExp(domain);
		return re.test(actual);
	});
	return allowed;
};

var validateHostsOrigins = function (req, allowedHosts, allowedOrigins, opts) {

	// as jquery won't allow you to set origin when simulating jsonp requests
	var originSecret = opts && opts.originSecret;
	var checkOrigin  = req.query[originSecret] || checkHost(req.headers.origin, allowedOrigins);
	var checkReferer = (opts && opts.dontCheckReferer) || checkHost(req.headers.referer, allowedHosts);

	// origin only set on CORS json requests NOT jsonPs
	return req.is('json') ? checkReferer && checkOrigin : checkReferer;
};



var allowXOrigin = function (allowedHosts, allowedOrigins, opts) {
	var returnXOrigin = function (req, res, next) {

	    if (validateHostsOrigins(req, allowedHosts, allowedOrigins, opts)) {

	    	if (req.is('json')) {
				// chrome only allows a single origin header
				// http://stackoverflow.com/questions/1653308/access-control-allow-origin-multiple-origin-domains
				// res.header('Access-Control-Allow-Origin', "*");
				res.header('Access-Control-Allow-Origin', req.headers.origin);
				res.header('Access-Control-Allow-Credentials', true);
				res.header('Access-Control-Allow-Methods', opts.httpMethods || 'GET,PUT,POST,DELETE');
				res.header('Access-Control-Allow-Headers', 'Content-Type, X-Requested-With');
	    	}

			next();

		} else {
			next(new Forbidden('host or referer not allowed'))
			// res.send(403, 'Forbidden');
		}
	};
	return returnXOrigin;
};

module.exports = {
	checkHost: checkHost,
	validateHostsOrigins: validateHostsOrigins,
	allowXOrigin: allowXOrigin
};