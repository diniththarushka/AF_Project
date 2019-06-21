const express = require('express');
const CORS = require('cors');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');

const routes = require('./routes');
const app = express();

const PORT = process.env.PORT || 4000;      //Default PORT for app

app.use(CORS({ origin: 'http://localhost:3000',credentials:true }));
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());
app.use(cookieParser());

app.use('/',routes);

app.listen(PORT,(err)=>{
   if(err){
       console.error('Error: '+err);
   }else
       console.log('Server is up and running in Port: '+PORT);
});