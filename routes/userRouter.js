const {Router} = require('express');

const router = Router();
const userController = require('../controllers/userController');

// Create
router.post('/signup', userController.createUser);

router.get('/authorization', userController.auth);

module.exports = router;
