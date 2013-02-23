
/*
 * GET home page.
 */

exports.index = function(req, res){
	var host = req.headers.host;
	res.render('index', { 
		title: 'Jax',
		tagline: 'Feed me XML and I\'ll spit out JSON',
		sampleLink: '/convert?xml=http%3A%2F%2F' + host + '%2Fsamples%2Fbooks.xml'
		hostname: host
	});
};