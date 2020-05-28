const Contacts = require('../models/contact');
const {validationResult} = require('express-validator');

exports.getContacts = (req, res, next) => {
    const page = +req.query.page || 1;
    const items_per_page = 4;
    let total;
    Contacts.find().countDocuments()
        .then(numContacts => {
            total = numContacts;
            return Contacts.find()
                .skip((page - 1) * items_per_page)
                .limit(items_per_page)
        }).then(contacts => {
            res.status(200).send({
                contacts: contacts,
                currPage: page,
                hasNextPage: page * items_per_page < total,
                hasPrevious: page > 1,
                nextPage: page + 1,
                previousPage: page - 1,
                lastPage: Math.ceil(total / items_per_page),
            });
        }).catch(err => {
            console.log(err);
        });
}

exports.addContact = (req, res, next) => {

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(422).json({ errors: errors.array() });
    }

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
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(422).json({ errors: errors.array() });
    }
    const id = req.body.id;
    Contacts.findByIdAndDelete({ _id: id }).then(result => {
        res.status(200).send({
            message: "Contact Successfully Deleted"
        })
    });
}

exports.editContact = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(422).json({ errors: errors.array() });
    }
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
