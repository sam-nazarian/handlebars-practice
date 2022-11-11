var express = require('express');
var app = express();

var handlebars = require('express-handlebars').create({ defaultLayout: 'main' });

app.engine('handlebars', handlebars.engine);
app.set('view engine', 'handlebars');

app.set('port', process.env.PORT || 3000);

//be careful with this
app.use(express.static(__dirname + '/static-files/'));

//Routes
app.get(['/', '/index'], function (req, res) {
  res.render('body-index', { picture: '/meme-home.jpg', citation: 'https://en.wikipedia.org/wiki/Meme' });
});

app.get('/meme-acs', function (req, res) {
  res.render('body-acs', { picture: '/meme-acs.jpeg', citation: 'https://en.wikipedia.org/wiki/Computer_science' });
});

app.get('/meme-math', function (req, res) {
  res.render('body-math', { picture: '/meme-math.jpg', citation: 'https://en.wikipedia.org/wiki/Mathematics' });
});

app.get('/headers', function (req, res) {
  res.set('Content-Type', 'text/plain');
  var s = '';
  for (var name in req.headers) s += name + ': ' + req.headers[name] + '\n';
  res.send(s);
});

//custom 404 page
app.use(function (req, res) {
  res.status(404);
  res.render('body-404', { picture: '/meme-404.jpg', citation: '#' });
});

// custom 500 page
app.use(function (err, req, res, next) {
  console.error(err.stack);
  res.status(500);
  //no pic for this as q1, didn't have a pic for 500 error
  res.render('body-500', { citation: '#' });
});

app.listen(app.get('port'), function () {
  console.log('Express started on http://localhost:' + app.get('port') + '; press Ctrl-C to terminate.');
});
