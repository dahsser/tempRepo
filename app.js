const express = require('express');
const path = require('path');
const exphbs = require('express-handlebars');
const methodOverride = require('method-override');
const flash = require('connect-flash');
const session = require('express-session');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const passport = require('passport');

const app = express();


// Load routes;
const proyectos = require('./routes/proyectos');
const users = require('./routes/users');

// Passport Config

require('./config/passport')(passport);

//Connect to mongoose
mongoose.connect('mongodb://localhost/matrixExistencias')
.then(()=>{
  console.log('Conectado a mongodb...')
}).catch(err =>{
  console.log(err);
});



app.engine('handlebars', exphbs({
  defaultLayout : 'main'
}));

app.set('view engine', 'handlebars');

// Body Parser middleware
app.use(bodyParser.urlencoded({ extended:false }));
app.use(bodyParser.json());

app.use(express.static(path.join(__dirname, 'public')));

// Method override middleware
app.use(methodOverride('_method'));

// Express sessio nmiddleware
app.use(session({
  secret: '_secret_',
  resave: true,
  saveUninitialized: true,
}));

// Passport middleware

app.use(passport.initialize());
app.use(passport.session());

app.use(flash());

// Global variables

app.use(function(req, res, next){
  res.locals.success_msg = req.flash('success_msg');
  res.locals.error_msg = req.flash('error_msg');
  res.locals.error = req.flash('error');
  res.locals.user = req.user || null;
  next();
});


// Index route
app.get('/', (req, res) =>{
  res.render('index', {
    title:'Matrix Existencias'
  });
});

// About route
app.get('/about', (req, res)=> {
  res.render('about')
});



// Use routes
app.use('/proyectos', proyectos);
app.use('/users', users);

const port = process.env.PORT || 5000;


app.listen(port, ()=> {
  console.log(`Sever escuchando en el puerto ${port}`);
});