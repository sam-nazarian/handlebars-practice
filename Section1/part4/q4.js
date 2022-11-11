const express = require('express');
const handlebars = require('express-handlebars').create();

var app = express();

app.engine('handlebars', handlebars.engine);
app.set('view engine', 'handlebars');

app.set('port', process.env.PORT || 3000);

// body-parser middleware
//express depends on body-parser module, so that's why it's already installed in the node_modules
app.use(require('body-parser').urlencoded({ extended: true }));

app.get('/', function (req, res) {
  //Based on documentation in https://www.npmjs.com/package/express-handlebars, I removed the default layout below.
  res.render('form', { layout: false });
});

// body-parser middleware must be linked in
app.post('/process-form', function (req, res) {
  console.log(req.body);
  res.send(req.body);
  res.end();
  // save to database....
});

app.listen(app.get('port'), function () {
  console.log('Express started on http://localhost:' + app.get('port') + '; press Ctrl-C to terminate.');
});
