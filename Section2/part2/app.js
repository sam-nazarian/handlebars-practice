const express = require('express');
const app = express();
const hbs = require('express-handlebars').create({
  defaultLayout: 'main2',
});

//all environments
app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');

// configure Handlebars view engine

//app.use(express.static(__dirname + '/public'))

app.get('/', (req, res) => {
  res.render('index');
});
app.get('/contact', (req, res) => {
  res.render('contact');
});
app.get('/lectures', (req, res) => {
  res.render('lectures');
});
app.get('/marks', (req, res) => {
  res.render('marks');
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Express started on http://localhost:${port}` + '; press Ctrl-C to terminate.');
});
