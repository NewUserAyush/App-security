const express = require('express');
const router = express.Router();

const usercontroller = require('./user.routes');

router.post('/register', usercontroller.register);
router.post('/login', usercontroller.login);
router.get('/users',usercontroller.getAllUser)

module.exports = router;