/**
 * Saman Fathnazarian
 * part1
 */
var express = require('express'),
  handlebars = require('express-handlebars').create({ defaultLayout: 'main' }),
  cookieParser = require('cookie-parser'), //allows to read cookie
  credentials = require('./credentials'); //where secret key is stored

var app = express();
app.use(cookieParser(credentials.cookieSecret));

app.engine('handlebars', handlebars.engine);
app.set('view engine', 'handlebars');

app.get('/', function (req, res) {
  //Note to myself, just ignore this, by adding a secret it makes it hard for user user to modify the cookie (https://stackoverflow.com/questions/11897965/what-are-signed-cookies-in-connect-expressjs)
  res.cookie('MySignedCookie', 'FathnazarianSignedCookie', { signed: true, maxAge: 1204800400 }); // singed cookie with secret code
  res.render('home');
});

app.get('/cookieShow', function (req, res) {
  var contextObj = { fcookie: req.signedCookies.MySignedCookie }; //instead of req.cookies we do req.signedCookies
  res.render('cookieShow', contextObj);
});

app.set('port', process.env.PORT || 3000);
app.listen(app.get('port'), function () {
  console.log('Express started on http://localhost:' + app.get('port') + '; press Ctrl-C to terminate');
});
