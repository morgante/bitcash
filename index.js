var express = require('express');
var _ = require('lodash');
var ejs = require('ejs');

var routes = require('./src/routes');

var app = express();

// use ejs
app.set('view engine', 'ejs');

// serve static assets at server root, from /public
app.use(express.static(__dirname + '/public'));


_.each(routes, function(route) {
	route(app);
});

var port = process.env.PORT || 3000;

app.listen(port);
console.log('server is listening on port %s', port);
