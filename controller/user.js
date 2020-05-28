const Contacts = require('../models/contact');

exports.getContacts = (req,res,next) => {
    const page = req.params.page || 1;
    Contacts.find().then(result =>{
        res.status(200).send(result);
    }).catch(err => {
        console.log(err);
    });
}

exports.addContact = (req,res,next) => {
    const name = req.body.name;
    const number = req.body.number;
    const email = req.body.email;
    const dob = req.body.dob || null;

    const contact = new Contacts({
        name: name,
        number: number,
        email: email,
        dob: dob
    });
    contact.save();
    res.status(201).send({
        message: "Contact Successfully created"
    });
}
