const appointmentManager = require('../managers/appointmentManager')

exports.createAppointment = async (req, res) => {
    const {doctorId} = req.params;
  
    const {paciente_id, fecha_cita, hora_inicio_cita, hora_fin_cita, motivo} =
      req.body.appointmentData;
  
    const newAppointmentData = {
      paciente_id,
      fecha_cita,
      hora_inicio_cita,
      hora_fin_cita,
      motivo,
    };
  
    const patient = await appointmentManager.createDoctorAppointment(
      doctorId,
      newAppointmentData,
    );
    res.status(200).send(patient);
  };
  
  exports.getAll = async (req, res) => {
    try {
      const {doctorId} = req.params;
      const appointments = await appointmentManager.getAllDoctorAppointments(doctorId);
      res.status(200).send(appointments);
    } catch (err) {
      console.error(err?.message);
      res.status(500).send({message: 'Internal server error'});
    }
  
  };