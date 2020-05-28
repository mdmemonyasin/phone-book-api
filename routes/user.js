const express = require('express');
const router = express.Router();

const userController = require('../controller/user');

router.get('/getContacts', userController.getContacts);

router.post('/addContact', userController.addContact);

router.put('/editContact');

module.exports = router;
