/**
 * Saman Fathnazarian
 * part2
 */
var express = require('express'),
  handlebars = require('express-handlebars').create({ defaultLayout: 'main' }),
  cookieParser = require('cookie-parser'),
  sessions = require('express-session'),
  bodyParser = require('body-parser'),
  mongoose = require('mongoose'),
  credentials = require('./credentials'),
  Users = require('./models/uCredentials.js'), //import Model
  md5 = require('md5');

// load env variables
const dotenv = require('dotenv');
dotenv.config();

var app = express();
//db connection
mongoose
  .connect(process.env.MONGO_URI, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
  })
  .then(() => console.log('DB Connected'));

//if any errors occur trying to connect to DB
mongoose.connection.on('error', (err) => {
  console.log(`DB connection error: ${err.message}`);
});

app.use(bodyParser.urlencoded({ extended: false })); //get body from req

app.use(cookieParser(credentials.cookieSecret));
app.use(
  sessions({
    resave: true,
    saveUninitialized: false,
    secret: credentials.cookieSecret,
    cookie: { maxAge: 3600000 },
  })
);

app.engine('handlebars', handlebars.engine);
app.set('view engine', 'handlebars');

app.get('/', function (req, res) {
  res.render('login');
});

async function checklogin(req, res, user, password) {
  try {
    //find user based on username
    const foundUser = await Users.findOne({ uname: user });
    if (!foundUser) {
      res.render('login', { message: `Username doesn't exist😢 please try again` });
      return; //exit this function
    }

    //if password & user password are not the same throw error
    //password points to password user entered
    if (md5(password) !== foundUser.pass) {
      res.render('login', { message: `Password doesn't match the username😔 please try again` });
      return; //exit this function
    }

    req.session.userName = req.body.uname;
    res.redirect(303, 'home'); //home route will now render home
  } catch (err) {
    console.log(`${err}💥`);
  }
}

//RUNS ON THE LOGIN PAGE WHICH IS ON '/'
app.post('/processLogin', function (req, res) {
  //Determine if user is registering
  if (req.body.buttonVar == 'login') {
    checklogin(req, res, req.body.uname.trim(), req.body.pword.trim());
  } else {
    res.redirect(303, 'register');
  }
});

app.post('/processReg', async function (req, res) {
  try {
    const foundUser = await Users.findOne({ uname: req.body.uname });

    //CREATE DATA WITH DB IF passwords match & username does not already exist in database & user entered input for pass & username
    if (req.body.pword.trim() == req.body.pword2.trim() && !foundUser && req.body.pword.length !== 0 && req.body.uname.length !== 0) {
      //show all previous users that already registered based on video professor showed

      allUsers = await Users.find({});
      console.log(`The number of users was ${allUsers.length}`);

      allUsers.forEach((user) => {
        console.log(user.uname);
        console.log(user.pass + '\n');
      });

      const encryptedPass = md5(req.body.pword.trim()); //encrypt pass & use it to create a new User

      await Users.create({ uname: req.body.uname, pass: encryptedPass });
      req.session.userName = req.body.uname;
      res.redirect(303, 'home');
    } else {
      res.render('register', { message: `Either Passwords did not match. or username already exists. or password field was empty. Try again😢` });
    }
  } catch (err) {
    console.log(`${err}💥`);
  }
});

app.get('/home', function (req, res) {
  if (req.session.userName) {
    res.render('home');
  } else {
    res.render('login', { message: 'Please login to access the home page' });
  }
});

app.get('/page2', function (req, res) {
  if (req.session.userName) {
    res.render('page2');
  } else {
    res.render('login', { message: 'Please login to access the second page' });
  }
});

app.get('/register', function (req, res) {
  res.render('register');
});

app.get('/logout', function (req, res) {
  delete req.session.userName;
  res.redirect(303, '/');
});

app.set('port', process.env.PORT || 3000); //I CHANGED PORT TO 3000(on env file too), to make it consistent with first question

app.listen(app.get('port'), function () {
  console.log('Express started on http://localhost:' + app.get('port') + '; press Ctrl-C to terminate');
});

process.on('unhandledRejection', (error) => {
  // Will print "unhandledRejection err is not defined"
  console.log('unhandledRejection', error.message);
});
