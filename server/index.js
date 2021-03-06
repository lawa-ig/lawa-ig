const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const morgan = require('morgan');
const router = require('./router.js');




var expressSession = require('express-session');



const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(morgan('dev'));
app.use(cookieParser());


app.use(expressSession({ secret: 'mySecretKey' }));

app.use(express.static(__dirname + '/../client/dist'));

app.options('/*', function (req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
  res.header('Access-Control-Allow-Headers', 'Access-Control-Allow-Origin, Content-Type, Authorization, Accept, Origin, Content-Length, X-Requested-With');
  res.header('Access-Control-Max-Age', 10);
  res.sendStatus(200);
});

app.use('/', router);




let port = process.env.PORT || 3000;
app.listen(port, () => console.log(`LawaGram listening on ${port}!`));

module.exports = app;
