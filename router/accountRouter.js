const express = require('express')
const router = express.Router();
const AccountController = require('../controllers/accountController');

router.post('/register', AccountController.createAccount);
router.get('/login', AccountController.login);
router.put('/:id', AccountController.updatePassword);
router.delete('/:id', AccountController.deleteAccount);


module.exports = router;
