const Contacts = require('../models/contact');

exports.getContacts = (req, res, next) => {
    const page = req.params.page || 1;
    Contacts.find().then(result => {
        res.status(200).send(result);
    }).catch(err => {
        console.log(err);
    });
}

exports.addContact = (req, res, next) => {
    const name = req.body.name;
    const number = req.body.number;
    const email = req.body.email;
    const dob = req.body.dob || null;
    let flag = false;
    Contacts.findOne({ number: { $in: number } }).then(result => {
        if (result) {
            res.status(400).send({
                message: "Phone Number is already present"
            })
        } else {
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
    });


}

exports.removeContact = (req, res, next) => {
    const id = req.body.id;
    Contacts.findByIdAndDelete({ _id: id }).then(result => {
        res.status(200).send({
            message: "Contact Successfully Deleted"
        })
    });
}

exports.editContact = (req, res, next) => {
    const id = req.body.id;
    const name = req.body.name;
    const number = req.bosy.number;
    const email = req.body.email;
    const dob = req.body.dob;

    Contacts.findByIdAndUpdate({
        _id: id,
        name: name, number: number, email: email, dob: dob
    }).then(result => {
        res.status(200).send({
            message: "Contact Successfully Updated"
        })
    }).catch(err => {
        res.send(500).send({ message: "Something went wrong" });
    });
}
