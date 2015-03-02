
/**
 * Module dependencies.
 */

var express = require('express'),
  bodyParser = require('body-parser'),
  statics = require('serve-static'),
  meth = require('method-override'),
  cors = require('cors'),
  http = require('http'),
  path = require('path'),
  convert = require('./routes/convert'),
  home = require('./routes/index'),
  app = module.exports = express();

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));
// parse application/json
app.use(bodyParser.json());
app.use(statics(path.join(__dirname, 'public')));
app.use(meth());
app.use(cors({
  headers: ['X-Requested-With']
}));
app.engine('jade', require('jade').__express);

app.get('/', home.index);
app.get('/convert', convert('json'));
app.get('/jsonp', convert('jsonp'));

http.createServer(app).listen(3000, function(){
  console.log("Express server listening on port 3000");
});
