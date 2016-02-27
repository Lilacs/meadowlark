var express = require('express');
var app = express();
var handlebars = require('express3-handlebars').create({ defaultLayout: 'main' });
app.engine('handlebars', handlebars.engine);
app.set('view engine', 'handlebars');

app.set('port', process.env.PORT || 3000);


var fortunes = require('./lib/fortune.js');

app.use(function(req, res, next) {
	res.locals.showTests = app.get('env') !== 'production' && req.query.test === '1';
	next();
});

app.use(express.static(__dirname + '/public'));

app.get('/', function(req, res) {
    // res.type('text/plain');
    // res.send('Meadowlark Travel');
    res.render('home',  { pageTestScript: '/qa/tests-global.js'});
});

app.get('/about', function(req, res) {
    // res.type('text/plain');
    // res.send('About Meadowlark Travel');
    res.render('about', { fortune: fortunes.getFortune(), pageTestScript: '/qa/tests-about.js'});
});

app.get('/tours/hood-river', function(req, res) {
	res.render('tours/hood-river');
});

app.get('/tours/request-group-rate', function(req, res) {
	res.render('tours/request-group-rate');
});

app.use(function(req, res){
    // res.type('text/plain');
    res.status(404);
    // res.send('404 - Not Found');
    res.render('404');
});

app.use(function(err, req, res, next) {
    console.error(err.stack);
    // res.type('text/plain');
    res.status(500);
    // res.send('500 - Server Error');
    res.render('500');
});

app.listen(app.get('port'), function() {
    console.log('Express start on http://localhost:' + app.get('port') + '; press Ctrl-C to terminate');
});