const {Router} = require('express');
const router = Router();

const appointmentController = require('../controllers/appointmentController')
const auth = require('../controllers/authController');

// Add Appointment
router.post('/:doctorId/create_appointment', auth.authenticateToken, appointmentController.createAppointment);

// Get Appointments
router.get('/:doctorId/all', auth.authenticateToken, appointmentController.getAll);

module.exports = router;