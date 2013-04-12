# Express Validate Requests

[![Build Status](https://secure.travis-ci.org/techjacker/express-validate-requests.png)](http://travis-ci.org/techjacker/express-validate-requests)

## QuickStart
#### The following MIDDLEWARE (app.use(fn)) methods are included:
- sanitizeRequest(req, res, next)
- allowJustXHR(req, res, next)
- allowJustJsonRequests(req, res, next)
- allowXOrigin(req, res, next)

If the validation fails then an next(error) will be called. You should set up an error catcher as your last piece of middleware as a catchall for any errors.

#### The following helper fns are included:
- checkGotAllParams(params:{@Object}, requiredParamsKeys:{@Array})

## Full Example

```JavaScript
var express    	= require('express'),
    app        	= express(),
    valExpress 	= require('express-validate-requests'),
    middle 		= valExpress.middleware,
    helpers		= valExpress.helpers,
	allowedHosts = ["api.domainx.com", "www.domainx.com"],
	allowedOrigins = ["http://domainx.com", "http://www.domainx.com"];

app.configure(function() {
	app.use(middle.allowJustXHR);
	app.use(middle.onlyAllowJsonRequests);
	app.use(middle.sanitizeRequest);

	// middle.setAllowCrossOrigin returns fn(req, res, next)
	app.use(middle.setAllowCrossOrigin(allowedHosts, allowedOrigins));
});

app.get('/someroute', function (req,res,next) {
	var requiredParamsKeys = ["paramOneKey", "paramTwoKey"];
	if (!helpers.checkGotAllParams(req.query, requiredParamsKeys)) {
		next(new Error('invalid params'));
	} else {
		next();
	}
});

//... error catcher at very bottom
app.configure('development', function() {
    app.use(express.errorHandler()); // built-in express error handler
});

// listen once configured everything
http.createServer(app).listen(app.get('port'), function() {
	console.log("Express server listening on port: " + app.get('port'));
});
```