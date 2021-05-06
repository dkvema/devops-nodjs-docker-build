const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const routes = require('./routes/index');
const secrets = require('aws-secrets');
const app = express();

// View enginer setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

// Middleware setup
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// Mount routes
app.use('/', routes);

//added newly devenda start
const dotenv = require('dotenv');
dotenv.config();
console.log(`Your port is ${process.env.PORT}`); // 8626

//added newly devenda end

// Start server
var port = process.env.PORT || '3000';
app.set('port', port);
app.listen(port, function () {
  console.log('Example app listening on port ' + port);
});
