const {Router} = require('express');
const router = Router();

const appointmentController = require('../controllers/appointmentController')
const auth = require('../controllers/authController');

// Add Appointment
router.post('/:doctorId/create_appointment', auth.authenticateToken, appointmentController.createAppointment);

// Get Appointments
router.get('/:doctorId/all', auth.authenticateToken, appointmentController.getAll);

// Read
router.get('/:doctorId/appointment/:appointmentId', auth.authenticateToken, appointmentController.get);

// Update
router.put('/:doctorId/appointment/:appointmentId', auth.authenticateToken, appointmentController.update);

// Delete
router.delete('/:doctorId/appointment/:appointmentId', auth.authenticateToken, appointmentController.delete);

module.exports = router;