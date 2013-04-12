/*jslint nomen: true, plusplus: false, sloppy: true, white:true*/
/*jshint nomen: false, curly: true, plusplus: false, expr:true, undef:true, newcap:true, latedef:true, camelcase:true  */
/*global module: false, iScroll:false, setTimeout: false, document:false, WebKitCSSMatrix:false, _: false, Backbone: false, backbone: false, $: false, define: false, require: false, console: false, window:false */

var _ = require('underscore');
var sanitize = require('validator').sanitize;


var sanitizeParams = function (paramsObj) {
	_.each(paramsObj, function (param, key, list) {
		paramsObj[key] = sanitize(sanitize(param).entityDecode()).xss();
	});
	return paramsObj;
};

var sanitizeRequest = function (req, res, next) {
	req.query = sanitizeParams(req.query);
	next();
};

module.exports = sanitizeRequest;