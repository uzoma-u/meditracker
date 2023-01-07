const helmet = require('helmet');
const db = require('./config/db');
const passport = require('passport');
const session = require('express-session');
const exphbs = require('express-handlebars');
const {app_port} = require('./config/config');
const handlebars = exphbs.create({defaultLayout: 'main'});
const indexRoute = require('./index/indexRoute');
const profileRoute = require('./profile/profileRoute');
const SequelizeStore = require('connect-session-sequelize')(session.Store);
require('./config/passport')(passport);



const express = require('express');
const app = express();

(async () => {
    try {
        await db.authenticate();
        console.log('Connection has been established successfully.');
    }
    catch (error) {
        console.error('Unable to connect to the database:', error);
    }
})();


app.engine('.hbs', handlebars.engine);
app.set('view engine', '.hbs');
app.use(helmet());
app.use(express.json());
app.use(express.urlencoded( {extended:true}));




const myStore = new SequelizeStore({db: db,
    expiration: 24 * 60 * 60 * 1000
});

app.use(session({ 
    secret: process.env.SECRET,
    store: myStore,
    resave: true,
    saveUninitialized: true,
    cookie: {maxAge: 86400000, secure: false}
}));
myStore.sync();

app.use(passport.initialize());
app.use(passport.session()); //Persist login session




app.use('/', indexRoute);
app.use('/profiles', profileRoute);










const port = app_port|| 3000;
app.listen(port, () => console.log(`Listening on Port: ${port}`));