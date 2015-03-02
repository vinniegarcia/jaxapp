var parser = require('xml2json'),
  composer = require('composable-middleware'),
  request = require('superagent');

function fetchTransform(req, res, next) {
  var xmlUrl = req.query.xml,
    options = {
      object: true,
      reversible: false,
      coerce: true,
      sanitize: true,
      trim: true
    };
  request.get(xmlUrl).end(function (err, response) {
    if (err) {
      return next(err);
    }
    res.locals.converted = parser.toJson(response);
    next();
  });
}

function send (type) {
  return composer().use(fetchTransform).use(function (req, res) {
    res[type](parser.toJson(res.locals.converted));
  });
}

module.exports = send;
