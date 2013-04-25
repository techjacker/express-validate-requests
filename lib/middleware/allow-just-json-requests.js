/*jslint nomen: true, plusplus: false, sloppy: true, white:true*/
/*jshint nomen: false, curly: true, plusplus: false, expr:true, undef:true, newcap:true, latedef:true, camelcase:true  */
/*global module: false, iScroll:false, setTimeout: false, document:false, WebKitCSSMatrix:false, _: false, Backbone: false, backbone: false, $: false, define: false, require: false, console: false, window:false */

var	NotAcceptable = require('custom-errors').request.NotAcceptable; // my custom error classes

var forbidHtmlText = function (req, res, next) {

	// use req.is() as res.format() does not have jsonP method
	// http://expressjs.com/api.html#req.is
	if (req.is('html')) {
			next(new NotAcceptable('html request not allowed'))
	} else if (req.is('text/*')) {
			next(new NotAcceptable('text request not allowed'))
	} else {
			next();
	}

};

var allowJustJsonRequests = function (req, res, next) {

	res.format({
		// text/*
		text: function() {
			next(new NotAcceptable('text request not allowed'))
			// res.send(406, "Not Acceptable");
		},
		// html/*
		html: function() {
			next(new NotAcceptable('html request not allowed'))
			// res.send(406, "Not Acceptable");
		},
		jsonP: function() {
			next();
		},
		json: function() {
			next();
		}
	});
};


module.exports = {
	forbidHtmlText: forbidHtmlText,
	allowJustJsonRequests: allowJustJsonRequests
};