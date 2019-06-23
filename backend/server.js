const express = require('express');
const CORS = require('cors');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');

const routes = require('./routes');
const app = express();

const PORT = 4000;      //Default PORT for app

const CORS_OPT = {
    credentials: true,
    origin: 'http://localhost:3000'
};

app.use(CORS(CORS_OPT));
app.use(cookieParser());
app.use(bodyParser.urlencoded({extended: false,}));
app.use(bodyParser.json());


app.use('/', routes);

app.listen(PORT, (err) => {
    if (err) {
        console.error('Error: ' + err);
    } else
        console.log('Server is up and running in Port: ' + PORT);
});