const express = require('express');
const router = express.Router();
const {check}  = require('express-validator');

const userController = require('../controller/user');

router.get('/getContacts', userController.getContacts);

router.post('/addContact',[
    check('name').exists(),
    check('number').exists(),
    check('email').exists()
], userController.addContact);

router.put('/editContact',[
    check('name').exists(),
    check('number').exists(),
    check('email').exists()
], userController.editContact);

router.delete('/removeContact',[
    check("id").exists()
], userController.removeContact);

module.exports = router;
