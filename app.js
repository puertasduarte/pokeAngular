// Declarations
const http = require('http');
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const hostname = '127.0.0.1';
const port = 3000;
const app = express();
const path = require('path');
const ficherosEstaticos = path.join(__dirname, 'dist');

// more routes for our API will happen here

// REGISTER OUR ROUTES -------------------------------
// all of our routes will be prefixed with /api
let router = express.Router();
app.use('/api', router);

// Server code
app.use(cors());
app.use(express.static(ficherosEstaticos));
app.use(express.static(path.join(__dirname, 'dist')));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get('/', function(request, response) {
    response.status(200);
    response.render('index.html');
});

app.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}/`);
});
