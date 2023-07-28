const {Router} = require('express');

const router = Router();
const auth = require('../controllers/authController');
const userController = require('../controllers/userController');

// Create
router.post('/signup', userController.createUser);

router.get('/authorization', userController.auth);

router.get('/:userId/info', auth.authenticateToken, userController.getUserLoginInfo);

module.exports = router;
