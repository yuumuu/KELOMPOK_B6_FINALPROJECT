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

// Use Routes
app.use('/', routes);

// Start Server
app.listen(3000, '0.0.0.0', () => {
    console.log(`Server is running internally on port 3000`);
});
