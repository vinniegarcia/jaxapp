
/*
 * GET home page.
 */

exports.index = function(req, res){
	res.render('index', { 
		title: 'Jax',
		tagline: 'Feed me XML and I\'ll spit out JSON',
		hostname: req.headers.host
	});
};