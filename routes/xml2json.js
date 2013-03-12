
/*
 * GET home page.
 */

exports.jsonp = function (req, res) {
	var http = require('http'),
	parser = require('xml2json'),
	xmlUrl = req.query.xml,
	callback = req.query.callback,
	jsonResponse = {},
	options = {
	  object: true,
	  reversible: false,
	  coerce: true,
	  sanitize: true,
	  trim: true 
	},
	fetch,
	chunks = "";
	res.setHeader('Content-type', 'text/javascript');
	fetch = http.request(xmlUrl, function(xmlResponse) {
		console.log('STATUS: ' + xmlResponse.statusCode);
		console.log('HEADERS: ' + JSON.stringify(xmlResponse.headers));
		xmlResponse.setEncoding('utf8');
		xmlResponse.on('data', function (chunk) {
			chunks += chunk.toString();
		});
		xmlResponse.on('end', function () {
			console.log("DATA:" + chunks);
			try {
				jsonResponse = parser.toJson(chunks);
				res.send(callback + "(" + jsonResponse + ");");
			} catch (e) {
				jsonResponse = {
					"message": e.message,
					"status": "bad"
				}
				res.send(JSON.stringify(jsonResponse));
			}
		})
		//res.send(jsonResponse);
	}).on('error', function(e) {
	    jsonResponse = {
	    	"message": e.message,
	    	"status": "bad"
	    };
	    res.send(jsonResponse);
	});
	fetch.end();
}

exports.convert = function(req, res){
	var http = require('http'),
	parser = require('xml2json'),
	xmlUrl = req.query.xml,
	jsonResponse = {},
	options = {
	  object: true,
	  reversible: false,
	  coerce: true,
	  sanitize: true,
	  trim: true 
	},
	fetch,
	chunks = "";
	res.setHeader('Content-type', 'application/json');
	fetch = http.request(xmlUrl, function(xmlResponse) {
		console.log('STATUS: ' + xmlResponse.statusCode);
		console.log('HEADERS: ' + JSON.stringify(xmlResponse.headers));
		xmlResponse.setEncoding('utf8');
		xmlResponse.on('data', function (chunk) {
			chunks += chunk.toString();
		});
		xmlResponse.on('end', function () {
			console.log("DATA:" + chunks);
			try {
				jsonResponse = parser.toJson(chunks);
				res.send(jsonResponse);
			} catch (e) {
				jsonResponse = {
					"message": e.message,
					"status": "bad"
				}
				res.send(jsonResponse);
			}
		})
		//res.send(jsonResponse);
	}).on('error', function(e) {
	    jsonResponse = {
	    	"message": e.message,
	    	"status": "bad"
	    };
	    res.send(jsonResponse);
	});
	fetch.end();
};