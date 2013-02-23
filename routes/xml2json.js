
/*
 * GET home page.
 */

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
			//console.log('BODY: ' + chunk);
			//jsonResponse = parser.toJson(chunk);
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
	// write data to request body
	//req.write('data\n');
	//req.write('data\n');
	fetch.end();
};