const express  = require('express');
const app      = express();                               // create our app w/ express
const morgan = require('morgan');             // log requests to the console (express4)
const bodyParser = require('body-parser');    // pull information from HTML POST (express4)
const api = express.Router();

// configuration =================

app.use(express.static(__dirname + '/public'));                 // set the static files location /public/img will be /img for users
app.use(morgan('dev'));                                         // log every request to the console
app.use(bodyParser.urlencoded({'extended':'true'}));            // parse application/x-www-form-urlencoded
app.use(bodyParser.json());                                     // parse application/json
app.use(bodyParser.json({ type: 'application/vnd.api+json' })); // parse application/vnd.api+json as json

// routes =========================

require('./routes/api')(api);

app.use('/api', api);
// app.get('*', (req, res) => {
//     res.sendFile(__dirname + '/public/index.html'); // load the single view file (angular will handle the page changes on the front-end)
// });

// listen (start app with node server.js) ======================================
app.listen(8080);
console.log("App listening on port 8080");
