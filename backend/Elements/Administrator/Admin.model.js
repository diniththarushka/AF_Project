const mongoose = require('../../_Database/dbconfig');
const Schema = mongoose.Schema;

const AdminSchema = new Schema({

    name: {
        type: String
    },
    contactNo: {
        type: String
    },
    address: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    }
},{
    collection:'Administrator'
});

module.exports  = mongoose.model('Admin', AdminSchema);