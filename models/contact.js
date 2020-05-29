const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const contactsSchema = Schema({
    name: {
        type: String,
        require: true,
    },
    number: {
        type: String,
        require: true
    },
    email: {
        type: String,
        require: true
    },
    dob: {
        type: Date,
        default: null
    }
});

module.exports =  mongoose.model('Contacts', contactsSchema);