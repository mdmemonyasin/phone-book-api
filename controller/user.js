const Contacts = require('../models/contact');
const { validationResult } = require('express-validator');

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

exports.getById = (req,res,next) =>{
    const id = req.query.id;
    if(id){
        Contacts.findById({_id: id}).then(reslult =>{
            res.status(200).send({
                contacts: reslult
            });
        }).catch(err =>{
            res.status(400).send({
                message: "User Not Found"
            })
        });
    }
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
    Contacts.findOne({ number: number }).then(result => {
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
    const id = req.query.id;
    Contacts.findByIdAndDelete({ _id: id }).then(result => {
        res.status(200).send({
            message: "Contact Successfully Deleted"
        })
    });
}

exports.editContact = (req, res, next) => {
    console.log(req.body);
    const id = req.body.userData._id;
    const name = req.body.name || req.body.userData.name;
    const number = req.body.number|| req.body.userData.number;
    const email = req.body.email || req.body.userData.email;
    const dob = req.body.dob || req.body.userData.dob;
    console.log(name);
    Contacts.findOneAndUpdate(
        {_id: id}, {$set: {
        name: name, number: number, email: email, dob: dob}}
    ).then(result => {
        res.status(200).send({
            message: "Contact Successfully Updated"
        })
    }).catch(err => {
        res.status(500).send({ message: "Something went wrong" });
    });
}

exports.getFilter = (req, res, next) => {
    console.log(req.query);
    const { name, email, number } = req.query;
    if (name) {
        Contacts.find({ name: { $regex: name, $options: "i" } }).then(result => {
            if (result) {
                res.status(200).send({
                    result: result
                })
            }
        })
    } else if (email) {
        Contacts.find({ email: email }).then(result => {
            if (result) {
                res.status(200).send({
                    result: result
                })
            }
        })
    } else if (number) {
        Contacts.find({ number: number }).then(result => {
            console.log(result);
            if (result) {
                res.status(200).send({
                    result: result
                })
            }
        })
    }
}
