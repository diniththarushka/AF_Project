const mongoose = require('../../_Database/dbconfig');
const Schema = mongoose.Schema;

const EmailSchema = new Schema({

    sender: {
        email:{type:String},
        password:{type:String}
    },
    reciever: {
        email:{type:String},
        password:{type:String},
        userRole:{type:String}
    }
},{
    collection:'Email_Logs'
});


module.exports  = mongoose.model('Email', EmailSchema);