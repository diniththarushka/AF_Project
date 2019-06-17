const mongoose = require('mongoose');

const DBName='University';

mongoose.connect('mongodb://localhost:27017/'+DBName,{useNewUrlParser:true}).then(()=>{
    console.log('Successfully connected to database...');
}).catch((err)=>{
   if(err){
       console.log('Error caught while connecting to database. Error: '+err);
   }
});

module.exports = mongoose;