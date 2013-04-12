/*jslint nomen: true, plusplus: false, sloppy: true, white:true*/
/*jshint nomen: false, curly: true, plusplus: false, expr:true, undef:true, newcap:true, latedef:true, camelcase:true  */
/*global module: false, iScroll:false, setTimeout: false, document:false, WebKitCSSMatrix:false, _: false, Backbone: false, backbone: false, $: false, define: false, require: false, console: false, window:false */

var _ = require('underscore');

var checkGotAllParams = function (paramsObj, requiredParams) {

	var notEmptyObj = !(_.isEmpty(paramsObj)) && _.isObject(paramsObj);

	return notEmptyObj && _.every(requiredParams, function (param) {
		return !_.isUndefined(paramsObj[param]) && !_.isNull(paramsObj[param]);
	});
};

module.exports = checkGotAllParams;