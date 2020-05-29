const express = require('express');
const router = express.Router();
const {check}  = require('express-validator');

const userController = require('../controller/user');

router.get('/getContacts', userController.getContacts);
router.get('/getById',userController.getById);

router.post('/addContact',[
    check('name').exists(),
    check('number').exists(),
    check('email').exists()
], userController.addContact);

router.put('/editContact', userController.editContact);

router.delete('/removeContact', userController.removeContact);

router.get('/getFilter',userController.getFilter);

module.exports = router;
