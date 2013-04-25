/*jslint nomen: true, plusplus: false, sloppy: true, white:true*/
/*jshint nomen: false, curly: true, plusplus: false, expr:true, undef:true, newcap:true, latedef:true, camelcase:true  */
/*global module: false, iScroll:false, setTimeout: false, document:false, WebKitCSSMatrix:false, _: false, Backbone: false, backbone: false, $: false, define: false, require: false, console: false, window:false */

// helpers
var checkGotAllParams = require('./helpers/check-got-all-params.js');
// middleware
var allowJustJsonRequests = require('./middleware/allow-just-json-requests.js');
var allowJustXHR = require('./middleware/allow-just-xhr.js');
var sanitizeRequest = require('./middleware/sanitize-requests.js');
var xOrigin = require('./middleware/allow-cross-origin-requests.js');

module.exports = {
	helpers: {
		"checkGotAllParams" 	: checkGotAllParams,
	},
	middleware: {
		"sanitizeRequest" 		: sanitizeRequest,
		"allowJustXHR" 			: allowJustXHR,
		"allowJustJsonRequests" : allowJustJsonRequests.allowJustJsonRequests,
		"forbidHtmlText" 		: allowJustJsonRequests.forbidHtmlText,
		"allowXOrigin" 			: xOrigin.allowXOrigin
	}
};