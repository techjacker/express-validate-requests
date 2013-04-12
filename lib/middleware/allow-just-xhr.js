/*jslint nomen: true, plusplus: false, sloppy: true, white:true*/
/*jshint nomen: false, curly: true, plusplus: false, expr:true, undef:true, newcap:true, latedef:true, camelcase:true  */
/*global module: false, iScroll:false, setTimeout: false, document:false, WebKitCSSMatrix:false, _: false, Backbone: false, backbone: false, $: false, define: false, require: false, console: false, window:false */

var	NotAcceptable = require('custom-errors').request.NotAcceptable; // my custom error classes

var allowJustXHR = function (req, res, next) {
	return (req.xhr === true) ? next() : next(new NotAcceptable('only xhr request allowed'));
};

module.exports = allowJustXHR;