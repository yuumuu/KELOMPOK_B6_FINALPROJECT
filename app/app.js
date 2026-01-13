require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const routes = require('./routes/index');

const app = express();
const port = process.env.APP_PORT || 3000;

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));

// View Engine (EJS)
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'view'));

const methodOverride = require('method-override');

// override dengan query string ?_method=PUT atau ?_method=DELETE
app.use(methodOverride('_method'));

app.use(session({
    secret: 'rahasia_super_aman', // Ganti dengan string acak
    resave: false,
    saveUninitialized: false,
    cookie: { 
        secure: false, // Set true jika menggunakan HTTPS
        maxAge: 1000 * 60 * 60 * 24 // 1 Hari
    } 
}));

app.use((req, res, next) => {
    res.locals.user = req.session.user || null;
    next();
});

// Use Routes
app.use('/', routes);

// Start Server
app.listen(process.env.APP_PORT || 3000, '0.0.0.0', () => {
  console.log(`Server running on port ${process.env.APP_PORT || 3000}`);
});
