const express = require('express');
const app = express();
const hbs = require('express-handlebars').create();

//all environments
app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');

// configure Handlebars view engine

//app.use(express.static(__dirname + '/public'))

//no params
app.get('/', (req, res) => {
  const bodyColor = 'white';

  res.render('q3', { bodyColor }); //, {layout: false}
});

//with params
app.get('/:bodyColor', (req, res) => {
  bodyColor = req.params.bodyColor;

  if (bodyColor === 'random') {
    //give a random bodyColor
    bodyColor = Math.floor(Math.random() * 16777215).toString(16);
  }

  res.render('q3', { bodyColor }); //, {layout: false}
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Express started on http://localhost:${port}` + '; press Ctrl-C to terminate.');
});
