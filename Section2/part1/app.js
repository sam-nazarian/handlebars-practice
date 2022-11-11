const express = require('express');
const routes = require('./routes');
const http = require('http'); //core module

const app = express();
const hbs = require('express-handlebars').create({
  defaultLayout: 'main',
});

//all environments
app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');
// app.set('views', __dirname + '/views');
app.use(express.static(__dirname + '/public'));

//paths
app.get('/', routes.api);

app.set('port', process.env.PORT || 3000);
http.createServer(app).listen(app.get('port'), function () {
  console.log('Express server listening on port ' + app.get('port'));
});
