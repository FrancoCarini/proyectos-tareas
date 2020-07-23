const express = require('express')
const dotenv = require('dotenv')
//Load env vars
dotenv.config({path: './config/config.env'})
const expressLayouts = require('express-ejs-layouts')
const bodyParser = require('body-parser')
const db = require('./config/db')
const flash = require('connect-flash')
const session = require('express-session')
const passport = require('./config/passport')

const Project = require('./models/Project')
const Task = require('./models/Task')
const User = require('./models/User')

Project.hasMany(Task)
Task.belongsTo(Project)
User.hasMany(Project)

// DB Connection
db
  .sync()
  .then(() => console.log('Connection has been established successfully.'))
  .catch(err => console.error('Unable to connect to the database:', err));

// Routes
const projectRoutes = require('./routes/projects');
const taskRoutes = require('./routes/tasks');
const usersRoutes = require('./routes/users');
const authRoutes = require('./routes/auth');

// Create express app
const app = express();

// Body Parser
app.use(bodyParser.urlencoded({ extended: false }));

// Static Fles
app.use(express.static('public'));

// Use Express Layouts
app.use(expressLayouts);

// Enable EJS
app.set('view engine', 'ejs');

// Flash
app.use(flash());

// Session
app.use(
  session({
    secret: 'mysecretkey',
    resave: false,
    saveUninitialized: false
  })
);

// Passport
app.use(passport.initialize())
app.use(passport.session())

// Message between requests. Global
app.use((req, res, next) => {
  res.locals.messages = req.flash()
  res.locals.user = {...req.user} || null
  next()
})

// Mount Routes
app.use(projectRoutes);
app.use(taskRoutes);
app.use(usersRoutes);
app.use(authRoutes);

app.listen(process.env.PORT, () => {
  console.log('Server running');
});