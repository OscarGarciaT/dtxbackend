const {Router} = require('express');

const router = Router();
const patientController = require('../controllers/patientController');
const auth = require('../controllers/authController');

//Get all Diagnoses
router.get('/diagnoses', auth.authenticateToken, patientController.getAllDiagnoses);

// Get all
router.get('/:doctorId', auth.authenticateToken, patientController.getAll);

// Create
router.post('/:doctorId', auth.authenticateToken, patientController.create);

// Read
router.get('/:doctorId/patient/:patientId', auth.authenticateToken, patientController.get);

// Update
router.put('/:doctorId/patient/:patientId', auth.authenticateToken, patientController.update);

// Delete
router.delete('/:doctorId/patient/:patientId', auth.authenticateToken, patientController.delete);

module.exports = router;
