const express = require('express');

const router = express.Router();
// Routers
const patientRouter = require('./patientRouter');
const appointmentRouter = require('./appointmentRouter')
const userRouter = require('./userRouter');

/* API Home page. */
router.get('/', (req, res) => {
  res.render('index', {title: 'Dentel X - API'});
});

// Router linking
router.use('/patients', patientRouter);
router.use('/users', userRouter);
router.use('/appointments', appointmentRouter)

module.exports = router;
